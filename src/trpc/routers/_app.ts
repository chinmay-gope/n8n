import { generateSlug } from "random-word-slugs";
import { createTRPCRouter, protectedProcedure } from "../init";
import prisma from "@/lib/db";
import { inngest } from "@/inngest/client";
export const appRouter = createTRPCRouter({
  getWorflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany({
      where: { userId: ctx.auth.user.id },
    });
  }),
  createWorkflow: protectedProcedure.mutation(async ({ ctx }) => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: ctx.auth.user.email,
      },
    });
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
