// import { createOpenAI } from "@ai-sdk/openai";
// import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

import { inngest } from "./client";

// const openai = createOpenAI();
// const anthropic = createAnthropic();
const google = createGoogleGenerativeAI();
export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ step }) => {
    await step.sleep("pretend-wait", "5s");

    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: google("gemini-2.5-flash"),
        system:
          "You are a helpful assistant that helps create AI generated content.",
        prompt: "Tell me a joke",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    );
    // const { steps: openaiSteps } = await step.ai.wrap(
    //   "openai-generate-text",
    //   generateText,
    //   {
    //     model: openai("gpt-4"),
    //     system:
    //       "You are a helpful assistant that helps create AI generated content.",
    //     prompt: "What is 2+2?",
    //     experimental_telemetry: {
    //       isEnabled: true,
    //       recordInputs: true,
    //       recordOutputs: true,
    //     },
    //   }
    // );
    // const { steps: anthropicSteps } = await step.ai.wrap(
    //   "anthropic-generate-text",
    //   generateText,
    //   {
    //     model: anthropic("claude-sonnet-4-0"),
    //     system:
    //       "You are a helpful assistant that helps create AI generated content.",
    //     prompt: "What is 2+2?",
    //     experimental_telemetry: {
    //       isEnabled: true,
    //       recordInputs: true,
    //       recordOutputs: true,
    //     },
    //   }
    // );
    return {
      geminiSteps,
      // openaiSteps,
      // anthropicSteps,
    };
  }
);
