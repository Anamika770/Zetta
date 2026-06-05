import express from "express";
import authMiddleware from '../middlewares/authMiddleware.js';
import { ObjectId } from 'mongodb';
import { client } from "../db/db.js";

const router = express.Router();

//get current user
router.get("/", authMiddleware, (req, res) => {
  const user = req.user;
  const response = { name: user.username, id: user._id.toString(), rootFolderId: user.rootFolderId.toString() };
  return res.status(200).json(response);
});

//register user
router.post("/register", express.json(), async (req, res, next) => {

  // console.log({
  //   url: req.url,
  //   method: req.method,
  //   username: req.body.username,
  //   password: req.body.password
  // });

  const { username, password } = req.body;
  const db = req.db;
  const usersCollection = db.collection("users");
  const FoldersCollection = db.collection("folders");

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  const session = await client.startSession();
  try {
    const existingUser = await usersCollection.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }
    console.log({ existingUser });

    const userId = new ObjectId();
    const rootDirId = new ObjectId();
    const rootFolderData = {
      _id: rootDirId,
      name: `root-${username}`,
      parentDirId: null,
      user: userId,
    };
    const newUser = {
      _id: userId,
      username: username,
      password: password,
      rootFolderId: rootDirId
    };

    session.startTransaction();
    const userResult = await usersCollection.insertOne(newUser, { session });
    if (!userResult.insertedId) {
      return res.status(500).json({ error: "Failed to register user" });
    }
    const folderResult = await FoldersCollection.insertOne(rootFolderData, { session });
    if (!folderResult.insertedId) {
      await usersCollection.deleteOne({ _id: userId });
      return res.status(500).json({ error: "Failed to create root folder" });
    }

    await session.commitTransaction();

    res.cookie("userId", newUser._id, {
      httpOnly: true,
      sameSite: "lax",
      secure: false
    });
    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    await session.abortTransaction();
    next(err);
  }
});

//login user
router.post("/login", express.json(), async (req, res) => {
  const { username, password } = req.body;

  // console.log({
  //   url: req.url,
  //   method: req.method,
  //   username,
  //   password
  // });

  const db = req.db;
  const usersCollection = db.collection("users");

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }
  const user = await usersCollection.findOne({ username });
  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  res.cookie("userId", user._id, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
  });
  return res.json({ message: "Login successful", userId: user._id, rootFolderId: user.rootFolderId });
});

//logout user
router.post("/logout", (req, res) => {
  res.clearCookie("userId");
  return res.status(204).end();
});

export default router;
