import mongoDb from 'mongodb';
async function authMiddleware(req, res, next) {
    const userId = req.cookies.userId;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const usersCollection = req.db.collection("users")
    const user = await usersCollection.findOne({ _id: new mongoDb.ObjectId(userId) });
    if (!user) {
        return res.status(404).json({ error: "Unauthorized" });
    }
    req.user = user;
    next();
}   

export default authMiddleware;