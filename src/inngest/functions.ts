import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    await step.sleep("wait-a-moment", "2s");
    await step.sleep("wait-a-moment", "3s");

    return { message: `Hello ${event.data.email}!` };
  }
);
