import "dotenv/config";
import database from "./services/eventService";
import express from "express";
import eventController from "./controllers/eventController";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

const app = express();
const port = process.env.PORT;

const swaggerDocument = YAML.load("./swagger.yaml");

if (!port) {
  throw new Error("PORT is not defined");
}

app.use(cors());
app.use(express.json());

database.connectToDatabase();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/api/event", eventController);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
