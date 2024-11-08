import "dotenv/config";
import mqttReader from "./mqttReader";
import database from "./database";

const MQTT_TOPIC = process.env.MQTT_TOPIC;

export const main = async () => {
  if (!MQTT_TOPIC) {
    throw new Error("MQTT_TOPIC is not defined");
  }

  database.connect();

  mqttReader.init(MQTT_TOPIC, (event) => database.insertMqttEvent(event));
};

main();
