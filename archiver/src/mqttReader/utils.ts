import { ChairId, EventType, MqttEvent } from "../types";

const isValidEventType = (type: any): type is EventType => {
  return ["ACTIVE", "INACTIVE", "ERROR", "RECLINE", "CHARGING"].includes(type);
};

const isValidChairId = (chairId: any): chairId is ChairId => {
  return typeof chairId === "string" && chairId.length > 0;
};

const isValidTimestamp = (timestamp: any): boolean => {
  return !isNaN(Date.parse(timestamp));
};

export const isValidMqttEvent = (event: any): event is MqttEvent => {
  return (
    typeof event === "object" &&
    event !== null &&
    isValidEventType(event.type) &&
    typeof event.id === "number" &&
    isValidChairId(event.chairId) &&
    isValidTimestamp(event.timestamp) &&
    (typeof event.log === "undefined" || typeof event.log === "string") &&
    typeof event.version === "string"
  );
};
