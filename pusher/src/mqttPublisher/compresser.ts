import jsonpack from "jsonpack";
import { MqttEvent } from "../types";

const compress = (rawEvent: MqttEvent) => {
  try {
    return jsonpack.pack(JSON.parse(JSON.stringify(rawEvent)));
  } catch (error) {
    console.log("Could not compress event", error, JSON.stringify(rawEvent));
    throw error;
  }
};

export default {
  compress,
};
