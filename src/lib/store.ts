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
  initialPrompt: "You are a cybersecurity assistant trained to detect social engineering and phishing attempts in voice call transcripts. Given the transcript of a phone call between an unknown caller and an employee, analyze the content and classify it as one of the following:'Risk' - if there are signs of manipulation, impersonation, urgent requests, data extraction attempts, or suspicious behavior. 'Legitimate' - if the conversation appears normal, without red flags. Also explain in 1–2 sentences why you made this classification."
});
