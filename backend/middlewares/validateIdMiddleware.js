import { ObjectId } from "mongodb";

export default function (req, res, next, id) {
  if (id === "root" || !ObjectId.isValid(id)) {
    return res.status(400).json({ error: `Invalid ID: ${id}` });
  }
  next();
}
