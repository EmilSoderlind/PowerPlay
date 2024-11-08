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

const getLog = (type: EventType) => {
  switch (type) {
    case "ERROR":
      return "Horrible null pointer exception BIP BOP";
    case "ACTIVE":
      return "Chair's actuators are active";
    case "INACTIVE":
      return "Chair's actuators became inactive";
    case "RECLINE":
      return "Chair is reclining";
    case "CHARGING":
      return "Chair is charging";
    default:
      return undefined;
  }
};

const publishEvent = async (topic: string, index: number) => {
  const type = EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)];
  const chairId = chairIds[Math.floor(Math.random() * chairIds.length)];

  const event: MqttEvent = {
    type,
    id: index,
    chairId,
    timestamp: new Date().toISOString(),
    log: getLog(type),
    version: "0.0.1",
  };

  await mqttPublisher.publish(topic, event);
};

const start = async (topic: string) => {
  console.log("Pusher starting!");
  let index = 0;

  const publishWithRandomInterval = async () => {
    await publishEvent(topic, index++);
    const randomInterval = Math.random() * 5000;

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
