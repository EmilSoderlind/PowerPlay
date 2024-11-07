export type MqttEvent = {
  type: EventType;
  id: number;
  chairId: ChairId;
  timestamp: string;
  log?: string;
  version: string;
};

export type ChairId = string;
export type EventType = (typeof eventTypeValues)[number];
export const eventTypeValues = [
  "ACTIVE",
  "INACTIVE",
  "ERROR",
  "RECLINE",
  "CHARGING",
  "DEMO",
];
