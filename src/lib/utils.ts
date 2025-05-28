import { AIModelAvailability } from "@/hooks/use-check-ai";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getAiApi = () => {
  return {
    create: LanguageModel.create.bind(LanguageModel),
  };
};

export async function checkSummarize() {
  function getChromeVersion() {
    var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    return raw ? parseInt(raw[2], 10) : 0;
  }

  const version = getChromeVersion();
  if (version < 129) {
    throw new Error(
      "Your browser is not supported. Please update to 129 version or greater",
    );
  }

  // Use the correct availability API
  const state = await checkAiStatus();
  if (state !== "available") {
    throw new Error("Summarize AI API is not ready");
  }
}

export async function checkEnv() {
  function getChromeVersion() {
    var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    return raw ? parseInt(raw[2], 10) : 0;
  }

  const version = getChromeVersion();
  if (version < 127) {
    throw new Error(
      "Your browser is not supported. Please update to 127 version or greater.",
    );
  }

  // Use the correct availability API
  const state = await checkAiStatus();
  if (state !== "available") {
    throw new Error(
      "Built-in AI is not ready, check your configuration in chrome://flags/#optimization-guide-on-device-model",
    );
  }
}

export const checkAiStatus = async () => {
  try {
    const state: string = await LanguageModel.availability();
    // Optionally log for debugging:
    console.log("LanguageModel availability:", state);

    LanguageModel.create()
      .then(() => {
        console.log("AI is ready");
      })
      .catch(console.error);

    return state;
  } catch (error) {
    console.error('Error checking AI status:', error);
    throw error;  // Optionally throw the error after logging it
  }
};

export const convertTitleToPath = (title: string) => {
  return title.split(" ").join("_");
};
export const convertParamToTitle = (param: string) => {
  return param.split("_").join(" ");
};
