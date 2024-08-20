import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getList: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany();
    return users ?? null;
  }),
  getUser: publicProcedure
  .input(z.object({ userId: z.number() }))
  .query(async ({ ctx, input }) => {
    const user = await ctx.db.user.findFirst(
      { where: { id:  input.userId} }
    );
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }),
  create: publicProcedure
    .input(z.object({ name: z.string().min(1), avatarUrl: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.create({
        data: {
          username: input.name,
          avatarUrl: input.avatarUrl,
        },
      });
    }),
});
