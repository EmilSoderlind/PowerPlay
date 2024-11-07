import { MqttEvent } from "../types";
import jsonpack from "jsonpack";

const decompress = (rawEvent: string): MqttEvent => {
  try {
    const unpacked = jsonpack.unpack(rawEvent) as MqttEvent;

    if (!validateEvent(unpacked)) {
      throw new Error("Invalid event object");
    }

    return unpacked;
  } catch (error) {
    console.log("Could not decompress event", error, JSON.stringify(rawEvent));
    throw error;
  }
};

const validateEvent = (event: MqttEvent): boolean => {
  // Here we really should validate the event object
  return true;
};

export default {
  decompress,
};
