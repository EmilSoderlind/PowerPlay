import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const DATABASE_NAME = "PowerPlay";
const COLLECTION_NAME = "EVENTS";

if (!uri) {
  throw new Error("MONGO_URI is not defined");
}

let client: MongoClient;

const connectToDatabase = async () => {
  try {
    client = new MongoClient(uri);
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

const find = async (page?: number, limit?: number) => {
  try {
    const database = client.db(DATABASE_NAME);
    const collection = database.collection(COLLECTION_NAME);

    if (!page || !limit) {
      return await collection.find({}).sort({ timestamp: -1 }).toArray();
    }

    const result = await collection
      .find({})
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ timestamp: -1 })
      .toArray();

    return result;
  } catch (error) {
    console.error("Error querying to MongoDB:", error);
  }
};

export default { connectToDatabase, find };
