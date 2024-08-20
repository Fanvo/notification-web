import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { NotificationTypeEnum } from "../enum/notificationtype";

const createNotification = async (
  ctx: any,
  input: { message: string; data: string; type: string },
) => {
  return ctx.db.notification.create({
    data: {
      message: input.message,
      data: input.data,
      type: input.type,
      createdAt: new Date(),
      read: false,
    },
  });
};

const getUser = async (ctx: any, userId: string) => {
  return ctx.db.user.findUnique({
    where: {
      id: Number(userId),
    },
  });
};

export const notificationRouter = createTRPCRouter({
  getList: publicProcedure.query(async ({ ctx }) => {
    const notifications = await ctx.db.notification.findMany({
      orderBy: { createdAt: "desc" },
    });

    return notifications;
  }),
  readNotification: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.notification.update({
        where: { id: input.id },
        data: { read: true },
      });
    }),
  create: publicProcedure
    .input(
      z.object({ message: z.string(), data: z.string(), type: z.string() }),
    )
    .mutation(async ({ ctx, input }) => {
      return createNotification(ctx, input);
    }),
  createPlatformUpdate: publicProcedure
    .input(
      z.object({
        version: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const message = `New platform update: ${input.version}`;
      return createNotification(ctx, {
        message,
        data: input.version,
        type: NotificationTypeEnum.PLATFORM_UPDATE,
      });
    }),
  createCommentTag: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await getUser(ctx, input.userId);
      const message = `${user.username} tagged you in a comment`;
      return createNotification(ctx, {
        message,
        data: input.userId,
        type: NotificationTypeEnum.COMMENT_TAG,
      });
    }),
  createAccessGranted: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await getUser(ctx, input.userId);
      const message = `${user.username} granted you access to a workspace`;
      return createNotification(ctx, {
        message,
        data: input.userId,
        type: NotificationTypeEnum.ACCESS_GRANTED,
      });
    }),
  createJoinWorkspace: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await getUser(ctx, input.userId);
      const message = `${user.username} joined a workspace`;
      return createNotification(ctx, {
        message,
        data: input.userId,
        type: NotificationTypeEnum.JOIN_WORKSPACE,
      });
    }),
});
