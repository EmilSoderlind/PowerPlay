import { MqttEvent } from "../types";
import jsonpack from "jsonpack";
import { isValidMqttEvent } from "./utils";

const decompress = (rawEvent: string): MqttEvent => {
  try {
    const unpacked = jsonpack.unpack(rawEvent);

    if (!isValidMqttEvent(unpacked)) {
      throw new Error("Invalid event object");
    }

    return unpacked;
  } catch (error) {
    console.log("Could not decompress event", error, JSON.stringify(rawEvent));
    throw error;
  }
};

export default {
  decompress,
};
