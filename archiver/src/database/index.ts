import { MqttEvent } from "../types";
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const DATABASE_NAME = "PowerPlay";
const COLLECTION_NAME = "EVENTS";

if (!uri) {
  throw new Error("MONGO_URI is not defined");
}

const client = new MongoClient(uri);

const connect = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

const insertMqttEvent = async (event: MqttEvent) => {
  try {
    const database = client.db(DATABASE_NAME);
    const collection = database.collection(COLLECTION_NAME);
    const result = await collection.insertOne(event);
    console.log(
      `New event inserted with the following id: ${result.insertedId}`
    );
  } catch (error) {
    console.error("Error inserting event:", error);
  }
};

export default { connect, insertMqttEvent };
