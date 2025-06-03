import { atomWithStorage } from "jotai/utils";

export interface ChatHistory {
  id: string;
  chatHistory: Chat[];
}
export interface Chat {
  id: number;
  role: "user" | "assistant";
  text: string;
  createdAt: string;
}
export const historyAtom = atomWithStorage<ChatHistory[]>("ChatHistory", []);

export const currentChatAtom = atomWithStorage<Chat[]>("CurrentChat", []);

export const sideTriggerAtom = atomWithStorage<boolean>("SideTrigger", false);

export interface ModelSettings {
  model: string;
  temperature: number;
  topK: number;
  initialPrompt: string;
}
export const settingsAtom = atomWithStorage<ModelSettings>("Settings", {
  model: "generic",
  temperature: 0.8,
  topK: 3,
  initialPrompt: "You are a hamster. Think like a hamster, and answer everything as though you are a hamster!",
});
