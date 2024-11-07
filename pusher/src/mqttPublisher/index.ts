import mqtt from "mqtt";
import { MqttEvent } from "../types";
import eventCompresser from "./compresser";

const MQTT_URL = "mqtt://test.mosquitto.org:1883";

const mqttClient = mqtt.connect(MQTT_URL);

const publish = async (topic: string, event: MqttEvent) => {
  try {
    await mqttClient.publishAsync(topic, eventCompresser.compress(event));
    console.log("Published event", JSON.stringify(event));
  } catch (error) {
    console.log("Error publishing event", error, JSON.stringify(event));
  }
};

export default { publish };
