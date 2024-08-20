import { Notification } from "@prisma/client";
import { NotificationTypeEnum } from "../utils/notificationtype";
import Link from "next/link";
import React from "react";
import { CircleIcon } from "@radix-ui/react-icons";

type Props = {
  item: Notification;
  onItemClick: (item: Notification) => void;
};

const backgroundColors: any = {
  [NotificationTypeEnum.PLATFORM_UPDATE]: "bg-yellow-400",
  [NotificationTypeEnum.COMMENT_TAG]: "bg-red-300",
  [NotificationTypeEnum.ACCESS_GRANTED]: "bg-blue-300",
  [NotificationTypeEnum.JOIN_WORKSPACE]: "bg-white",
  default: "bg-white",
};

export const NotificationItem = React.memo(({ item, onItemClick }: Props) => {
  const getNotificationType = () => {
    return (
      NotificationTypeEnum[item?.type as keyof typeof NotificationTypeEnum] ??
      NotificationTypeEnum.PLATFORM_UPDATE
    );
  };

  const renderItem = () => {
    const notificationType = getNotificationType();
    const bgColor =
      backgroundColors[notificationType] || backgroundColors.default;
    return (
      <div
        className={`mt-4 h-[100px] w-full cursor-pointer rounded ${bgColor}`}
      >
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center">
            <div
              className={`h-4 w-4 rounded-full ${
                item.read ? "" : "bg-green-500"
              }`}
            ></div>
          </div>
          <p className="text-black">{item?.message}</p>
        </div>
      </div>
    );
  };

  const getPath = () => {
    const notificationType = getNotificationType();
    switch (notificationType) {
      case NotificationTypeEnum.ACCESS_GRANTED:
        return "/chats";
      case NotificationTypeEnum.COMMENT_TAG:
        return "/comments";
      case NotificationTypeEnum.JOIN_WORKSPACE:
        return "/workspace";
      case NotificationTypeEnum.PLATFORM_UPDATE:
        return "/";
      default:
        return "/";
    }
  };

  return (
    <Link
      href={getPath()}
      onClick={() => {
        onItemClick(item);
      }}
    >
      {renderItem()}
    </Link>
  );
});
NotificationItem.displayName = "NotificationItem";
