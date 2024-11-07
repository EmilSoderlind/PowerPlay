import { isValidMqttEvent } from "./utils";
import { MqttEvent } from "../types";

describe("isValidMqttEvent", () => {
  it("should validate a correct MqttEvent", () => {
    const event: MqttEvent = {
      type: "ACTIVE",
      id: 1,
      chairId: "20d2c689",
      timestamp: new Date().toISOString(),
      version: "0.0.1",
    };

    expect(isValidMqttEvent(event)).toBe(true);
  });

  it("should invalidate an event with an incorrect type", () => {
    const event = {
      type: "INVALID_TYPE",
      id: 1,
      chairId: "20d2c689",
      timestamp: new Date().toISOString(),
      version: "0.0.1",
    };

    expect(isValidMqttEvent(event)).toBe(false);
  });

  it("should invalidate an event with a missing id", () => {
    const event = {
      type: "ACTIVE",
      chairId: "20d2c689",
      timestamp: new Date().toISOString(),
      version: "0.0.1",
    };

    expect(isValidMqttEvent(event)).toBe(false);
  });

  it("should invalidate an event with an incorrect chairId", () => {
    const event = {
      type: "ACTIVE",
      id: 1,
      chairId: "",
      timestamp: new Date().toISOString(),
      version: "0.0.1",
    };

    expect(isValidMqttEvent(event)).toBe(false);
  });

  it("should invalidate an event with an incorrect timestamp", () => {
    const event = {
      type: "ACTIVE",
      id: 1,
      chairId: "20d2c689",
      timestamp: "invalid-timestamp",
      version: "0.0.1",
    };

    expect(isValidMqttEvent(event)).toBe(false);
  });

  it("should invalidate an event with an incorrect version", () => {
    const event = {
      type: "ACTIVE",
      id: 1,
      chairId: "20d2c689",
      timestamp: new Date().toISOString(),
      version: 0.1,
    };

    expect(isValidMqttEvent(event)).toBe(false);
  });

  it("should validate an event with an optional log", () => {
    const event: MqttEvent = {
      type: "ERROR",
      id: 1,
      chairId: "20d2c689",
      timestamp: new Date().toISOString(),
      log: "Horrible null pointer exception BIP BOP",
      version: "0.0.1",
    };

    expect(isValidMqttEvent(event)).toBe(true);
  });

  it("should validate an event without an optional log", () => {
    const event: MqttEvent = {
      type: "ACTIVE",
      id: 1,
      chairId: "20d2c689",
      timestamp: new Date().toISOString(),
      version: "0.0.1",
    };

    expect(isValidMqttEvent(event)).toBe(true);
  });
});
