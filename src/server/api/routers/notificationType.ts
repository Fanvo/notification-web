import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const notificationTypeRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.notificationType.create({
        data: {
          code: input.name,
          notification: {},
        },
      });
    }),

  getList: publicProcedure.query(async ({ ctx }) => {
    const types = await ctx.db.notificationType.findMany();
    return types;
  }),
});
