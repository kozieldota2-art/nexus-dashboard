import { collection, doc } from "firebase/firestore";
import { nexusDb } from "./firebase";

function nexusCollection(name: string) {
  if (!nexusDb) throw new Error("Firebase ainda não foi configurado.");
  return collection(nexusDb, name);
}

export const nexusStore = {
  meta: () => nexusCollection("meta"),
  users: () => nexusCollection("users"),
  tasks: () => nexusCollection("tasks"),
  usageLogs: () => nexusCollection("usage_logs"),
  notes: () => nexusCollection("notes"),
  topics: () => nexusCollection("topics"),
  links: () => nexusCollection("links"),
  tags: () => nexusCollection("tags"),
  revisions: () => nexusCollection("revisions"),
  decisions: () => nexusCollection("decisions"),
  devices: () => nexusCollection("devices"),
  deviceEvents: () => nexusCollection("device_events"),
  deviceCommands: () => nexusCollection("device_commands"),
  user: (uid: string) => {
    if (!nexusDb) throw new Error("Firebase ainda não foi configurado.");
    return doc(nexusDb, "users", uid);
  },
};
