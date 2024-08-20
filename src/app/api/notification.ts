// pages/api/notifications.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { NotificationTypeEnum } from '../utils/notificationtype';
import { api } from '~/trpc/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { type, data } = req.body;
    await createNotification(type, data);
    res.status(200).json("Success");
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

async function createNotification(type: string, data: any) {
  const notificationType = NotificationTypeEnum[type as keyof typeof NotificationTypeEnum];
  if (!notificationType) {
    throw new Error(`Invalid notification type: ${type}`);
  }
  switch (notificationType) {
    case NotificationTypeEnum.PLATFORM_UPDATE:
      api.notification.createPlatformUpdate({ version: data });
      break;
    case NotificationTypeEnum.COMMENT_TAG:
      api.notification.createCommentTag({ userId: data });
      break;
    case NotificationTypeEnum.ACCESS_GRANTED:
      api.notification.createAccessGranted({ userId: data });
      break;
    case NotificationTypeEnum.JOIN_WORKSPACE:
      api.notification.createJoinWorkspace({ userId: data });
      break;
  }
  return;
}