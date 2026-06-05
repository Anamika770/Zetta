import { MongoClient } from 'mongoDb';

const mongoUrl = "mongodb://localhost:27017/";
export const client = new MongoClient(mongoUrl);

export async function connectDB(dbName) {
    await client.connect();
    const db = client.db(dbName);
    console.log("Database connected");
    return db;
}

process.on("SIGINT", async () => {
    await client.close();
    console.log("Client Disconnected!");
    process.exit(0);
});
