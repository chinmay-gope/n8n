import { generateSlug } from "random-word-slugs";

import prisma from "@/lib/db";
import { inngest } from "@/inngest/client";
import { createTRPCRouter, protectedProcedure } from "../init";

export const appRouter = createTRPCRouter({
  testAi: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "execute/ai",
    });
    return {
      success: true,
      message: "AI Job Queued",
    };
  }),
  getWorflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany({
      where: { userId: ctx.auth.user.id },
    });
  }),
  createWorkflow: protectedProcedure.mutation(async ({ ctx }) => {
    await prisma.workflow.create({
      data: {
        name: generateSlug(3),
        userId: ctx.auth.user.id,
      },
    });
    return {
      success: true,
      message: "Job Queued",
    };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
