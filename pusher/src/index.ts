import mqttPublisher from "./mqttPublisher";
import { v4 as uuidv4 } from "uuid";
import { EventType, eventTypeValues, MqttEvent } from "./types";
import "dotenv/config";

const MQTT_TOPIC = process.env.MQTT_TOPIC;
const EVENT_TYPES: EventType[] = eventTypeValues.filter(
  (type) => type !== "DEMO" // Demo events is manually generated
);
const CHAIR_COUNT = 5;
const chairIds = Array.from(
  { length: CHAIR_COUNT },
  () => uuidv4().split("-")[0]
);

const publishEvent = (topic: string, index: number) => {
  const type = EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)];
  const chairId = chairIds[Math.floor(Math.random() * chairIds.length)];

  const event: MqttEvent = {
    type,
    id: index,
    chairId,
    timestamp: new Date().toISOString(),
    log:
      type === "ERROR" ? "Horrible null pointer exception BIP BOP" : undefined,
    version: "0.0.1",
  };

  mqttPublisher.publish(topic, event);
};

const start = async (topic: string) => {
  console.log("Pusher starting!");
  let index = 0;

  const publishWithRandomInterval = () => {
    publishEvent(topic, index++);
    const randomInterval = Math.random() * 10000;
    setTimeout(publishWithRandomInterval, randomInterval);
  };

  publishWithRandomInterval();
};

export const main = async () => {
  if (!MQTT_TOPIC) {
    throw new Error("MQTT_TOPIC is not defined");
  }
  await start(MQTT_TOPIC);
};

main();
