import mqtt from "mqtt";
import { MqttEvent } from "../types";
import eventCompresser from "./compresser";

const options: mqtt.IClientOptions = {
  host: "test.mosquitto.org",
  port: 1883,
  clientId: "PowerPlay-pusher",
  clean: true,
  protocol: "tcp",
};

const mqttClient = mqtt.connect(options);

const publish = async (topic: string, event: MqttEvent) => {
  try {
    await mqttClient.publishAsync(topic, eventCompresser.compress(event));
    console.log("Published event", JSON.stringify(event));
  } catch (error) {
    console.log("Error publishing event", error, JSON.stringify(event));
  }
};

export default { publish };
