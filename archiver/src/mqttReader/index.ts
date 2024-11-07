import mqtt from "mqtt";
import eventCompresser from "./decompresser";
import { MqttEvent } from "../types";

const MQTT_URL = "mqtt://test.mosquitto.org:1883";

const init = (topic: string, onMessage: (event: MqttEvent) => void) => {
  let mqttClient = mqtt.connect(MQTT_URL);
  let retryCount = 0;
  const maxRetries = 5;

  mqttClient.on("connect", () => {
    console.log("Connected to MQTT broker");
    mqttClient.subscribe(topic, (err) => {
      if (err) {
        console.error("Failed to subscribe to topic:", err);
      } else {
        console.log(`Subscribed to topic: ${topic}`);
      }
    });
  });

  mqttClient.on("error", (error) => {
    console.error("Connection error:", error);

    if (retryCount < maxRetries) {
      console.log(`Reconnecting in ${Math.pow(2, retryCount) * 1000}ms`);
      setTimeout(
        () => {
          mqttClient.end();
          init(topic, onMessage);
        },
        Math.pow(2, retryCount) * 1000
      );
      retryCount++;
    } else {
      console.error("Max retries reached. Giving up.");
    }
  });

  mqttClient.on("message", (event, message) => {
    try {
      const event = eventCompresser.decompress(message.toString());
      onMessage(event);
    } catch (error) {
      console.error("Failed to decompress message:", error);
    }
  });
};

export default { init };
