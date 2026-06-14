import express from "express";
import path from "node:path";
import mime from "mime-types";
import { createWriteStream } from "node:fs";
import { rm } from "node:fs/promises";
import { writeFile } from "node:fs/promises";
import { ObjectId } from 'mongodb';
import validateIdMiddleware from "../middlewares/validateIdMiddleware.js";

const router = express.Router();

router.param("parentDirId", validateIdMiddleware);
router.param("id", validateIdMiddleware);

//read file
router.get("/:id", async (req, res, next) => {
  const base = path.resolve("./storage");
  const fileId = req.params.id;
  const user = req.user;
  const db = req.db;
  const filesCollection = db.collection("files");
  const foldersCollection = db.collection("folders")

  try {
    const fileData = await filesCollection.findOne({ _id: new ObjectId(fileId), user: user._id });
    if (!fileData) {
      return res.status(404).json({ error: "File not found" });
    }

    const parentDir = await foldersCollection.findOne({ _id: fileData?.parentDirId, user: user._id })
    if (!parentDir) {
      return res.status(404).json({ error: "Parent directory not found!" });
    }

    const filePath = path.join(base, fileId + fileData.extension);

    if (!filePath?.startsWith(base + path.sep)) {
      return res.status(403).json({ error: "Access denied" });
    }

    res.on("close", () => {
      console.log("Client disconnected");
    });

    if (req.query.action === "download") {
      return res.download(filePath, fileData.name, (err) => {
        if (err) {
          console.log(err);
          if (!res.headersSent) {
            return res.status(500).json({ error: "Failed to download file" });
          }
        }
      });
    }
    return res.sendFile(`${filePath}`, (err) => {
      if (err) {
        console.log(err);
        if (!res.headersSent) {
          return res.status(500).json({ error: "Failed to read file" });
        }
      }
    });

  } catch (err) {
    next(err)
  }
});

//create file
router.post("/:parentDirId?", async (req, res, next) => {
  let fileName = req.headers.filename || "untitled";
  const user = req.user;
  const parentDirId = req.params.parentDirId || user.rootFolderId;
  const db = req.db;
  const filesCollection = db.collection("files")
  const foldersCollection = db.collection("folders")

  if (!parentDirId) {
    return res.status(400).json({ error: "Parent directory ID is required" });
  }

  const parentDirData = await foldersCollection.findOne({
    _id: new ObjectId(parentDirId),
    user: req.user._id,
  });

  // Check if parent directory exists
  if (!parentDirData) {
    return res.status(404).json({ error: "Parent directory not found!" });
  }

  // Input validation
  if (typeof fileName !== 'string' || fileName.trim().length === 0 || fileName.trim().length > 255) {
    return res.status(400).json({ error: "File name must be between 1 and 255 characters" });
  }
  try {

    const basePath = path.resolve('./storage');
    const _id = new ObjectId();
    const filePath = path.join(basePath, `${_id}${path.extname(fileName)}`)
    const extension = path.extname(fileName);
    const mimeType = mime.lookup(fileName) || "application/octet-stream";

    //prevent duplicate fileName
    const duplicateFiles = await filesCollection.find({ parentDirId: new ObjectId(parentDirId), name: {$regex: `^${fileName}$`, $options: 'i'}, user: user._id }).toArray();
    if (duplicateFiles.length > 0) {
      console.log(duplicateFiles);
      fileName = fileName + `(${duplicateFiles.length})`;
    }

    const writeStream = createWriteStream(filePath);
    req.pipe(writeStream);
    
    writeStream.on("error", (err) => {
      next(err);
    });

    const newFileData = {
      _id,
      name: fileName,
      extension: extension,
      parentDirId: new ObjectId(parentDirId),
      user: user._id,
      mimeType: mimeType,
      
    };

    writeStream.on("finish", async () => {
      await filesCollection.insertOne(newFileData);
      return res.status(201).json({ message: "File uploaded successfully" });
    })

  } catch (err) {
    console.dir(err, { depth: null });
    next(err);
  }
});


//update file name
router.patch("/:id", express.json(), async (req, res) => {
  const fileId = req.params.id;
  const newName = req.body.newName;
  const user = req.user;
  const db = req.db;
  const filesCollection = db.collection("files");

  if (!newName || typeof newName !== "string" || newName.trim() === "") {
    return res.status(400).json({ error: "Invalid file name" });
  }
  const trimmedName = newName.trim();
  try {
    const isDuplicateFile = await filesCollection.findOne({ 
      name: trimmedName, 
      parentDirId: new ObjectId(req.body.parentDirId), 
      user: user._id,
      _id: { $ne: new ObjectId(fileId) }
    });
    if (isDuplicateFile) {
      return res.status(400).json({ error: "File name must be unique within the same directory" });
    }

    await filesCollection.updateOne({ _id: new ObjectId(fileId), user: user._id }, { $set: { name: trimmedName } });

    return res.json({ msg: "File renamed successfully." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "could not rename file."
    })
  }
});

//delete file
router.delete("/:id", async (req, res) => {
  const fileId = req.params.id;
  if (!fileId) {
    return res.status(400).json({ error: "File ID is required" });
  }
  const user = req.user;
  const db = req.db;
  const filesCollection = db.collection("files");
  const fileData = await filesCollection.findOne({ _id: new ObjectId(fileId), user: user._id });
  if (!fileData) {
    return res.status(404).json({ error: "File not found" });
  }

  const filePath = path.resolve(`./storage/${fileId}${fileData.extension}`);
  try {
    const deleteResult = await filesCollection.deleteOne({ _id: new ObjectId(fileId), user: user._id });
    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ error: "File not found" });
    }
    await rm(filePath);
    return res.json({ msg: "File deleted successfully." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "could not delete file."
    })
  }
});


export default router;
