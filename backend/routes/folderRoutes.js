import express from "express";
import { writeFile, rm } from "node:fs/promises";
import path from "node:path";
import mongoDb from 'mongodb';
import { client } from "../db/db.js";
import validateIdMiddleware from "../middlewares/validateIdMiddleware.js";

const router = express.Router();


//read folder and its content
router.get("/:folderId?", async (req, res) => {
  const user = req.user;
  const db = req.db;
  const foldersCollection = db.collection("folders");
  const filesCollection = db.collection("files");
  const folderId = req.params.folderId === "root" ? req.user.rootFolderId : req.params.folderId;
  if (!folderId) {
    return res.status(400).json({ error: "Folder ID is required" });
  }
  try {
    const folderData = await foldersCollection.findOne({ _id: new mongoDb.ObjectId(folderId), user: user._id });
    if (!folderData) {
      return res.status(404).json({ error: "Folder not found" });
    }
    const files = await filesCollection.find({ parentDirId: new mongoDb.ObjectId(folderId), user: user._id }).toArray()
    const folders = await foldersCollection.find({ parentDirId: new mongoDb.ObjectId(folderId), user: user._id }).toArray()
    res.json({
      ...folderData,
      id: folderData._id.toString(),
      files: files.map(({ _id, ...file }) => ({
        ...file,
        id: _id.toString()
      })),
      folders: folders.map(({ _id, ...folder }) => ({
        ...folder,
        id: _id.toString()
      }))
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to retrieve folder contents" });
  }

});

//create folder
router.post("/:parentDirId?", express.json(), async (req, res) => {
  console.log(req.params.parentDirId);
  const db = req.db;
  const folderCollection = db.collection("folders");
  const user = req.user;
  const folderName = req.body.folderName || "New Folder";
  const parentDirId = req.params.parentDirId === "root" ? user.rootFolderId : req.params.parentDirId;

  try {
    const isDuplicateFolder = await folderCollection.findOne({ name: folderName, parentDirId: new mongoDb.ObjectId(parentDirId), user: user._id });
    if (isDuplicateFolder) {
      return res.status(400).json({ error: "Folder name must be unique within the same directory" });
    }
    console.log({isDuplicateFolder});
    const newFolderData = {
      _id: new mongoDb.ObjectId(),
      name: folderName,
      parentDirId: new mongoDb.ObjectId(parentDirId),
      user: user._id
    };
    const result = await folderCollection.insertOne(newFolderData);
    if (!result.insertedId) {
      return res.status(500).json({ error: "Failed to create folder" });
    }

    res.json({ msg: "folder created Successfully." });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

//update folder name
router.patch("/:id", express.json(), async (req, res) => {
  const user = req.user;
  const db = req.db;
  const foldersCollection = db.collection("folders");
  const folderId = req.params.id;
  const newName = req.body.newName;

  if (!newName || typeof newName !== "string" || newName.trim() === "") {
    return res.status(400).json({ error: "Invalid folder name" });
  }
  const trimmedName = newName.trim();

  try {

    const isDuplicateFolder = await foldersCollection.findOne({ 
      name: trimmedName, 
      parentDirId: new mongoDb.ObjectId(req.body.parentDirId), 
      user: user._id,
      _id: { $ne: new mongoDb.ObjectId(folderId) }
    });
    if (isDuplicateFolder) {
      return res.status(400).json({ error: "Folder name must be unique within the same directory" });
    }
    await foldersCollection.updateOne({ _id: new mongoDb.ObjectId(folderId), user: user._id }, { $set: { name: trimmedName } });
    return res.json({ msg: "Folder renamed successfully." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "could not rename."
    })
  }
});

//delete folder
router.delete("/:id", async (req, res) => {
  const user = req.user;
  const db = req.db;
  const foldersCollection = db.collection("folders");
  const filesCollection = db.collection("files");
  const folderId = req.params.id;
  const folders = [];
  const files = [];

  async function getAllNestedItems(folderId) {
    const nestedFolders = await foldersCollection.find({ parentDirId: new mongoDb.ObjectId(folderId), user: user._id }, { projection: { _id: 1 } }).toArray();
    const nestedFiles = await filesCollection.find({ parentDirId: new mongoDb.ObjectId(folderId), user: user._id }, { projection: { _id: 1, extension: 1 } }).toArray();
    folders.push(...nestedFolders);
    files.push(...nestedFiles);
    for (const nestedFolder of nestedFolders) {
      await getAllNestedItems(nestedFolder._id);
    }
  }
  const session = await client.startSession();

  try {
    await getAllNestedItems(folderId);
    console.log(folders);
    console.log(files);

    session.startTransaction();
    await foldersCollection.deleteMany({ user: user._id, _id: { $in: folders.map(folder => folder._id) } }, { session });
    await filesCollection.deleteMany({ user: user._id, _id: { $in: files.map(file => file._id) } }, { session });
    await foldersCollection.deleteOne({ _id: new mongoDb.ObjectId(folderId), user: user._id }, { session });

    await session.commitTransaction();

    for (const file of files) {
      const filePath = path.join(process.cwd(), "storage", `${file._id.toString()}${file.extension}`);
      console.log(filePath);
      await rm(filePath);
    }

    return res.json({ msg: "Folder deleted successfully." });

  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    return res.status(500).json({
      msg: "could not delete folder."
    })
  }
  await client.close();
});

export default router;

