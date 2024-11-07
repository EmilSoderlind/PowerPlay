import "dotenv/config";
import database from "./services/eventService";
import express from "express";
import eventController from "./controllers/eventController";
import cors from "cors";

const app = express();
const port = process.env.PORT;

if (!port) {
  throw new Error("PORT is not defined");
}

app.use(cors());
app.use(express.json());

database.connectToDatabase();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/event", eventController);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
