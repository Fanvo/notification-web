"use client";
import { BellIcon } from "@radix-ui/react-icons";
import { NotificationItem } from "../_components/notification";
import DialogNotification from "../_components/dialogNotification";
import { Notification, User } from "@prisma/client";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";

export function NotificationPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [showList, setShowList] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const utils = api.useUtils();
  const onSuccess = async () => {
    await utils.invalidate();
    notificationQuery.refetch();
  };
  const onError = (error: any, variables: any, context: any) => {
    console.log("Error add notification", { error, variables, context });
  };

  const usersQuery = api.user.getList.useQuery();
  const notificationQuery = api.notification.getList.useQuery();
  const readNotification = api.notification.readNotification.useMutation({
    onSuccess,
    onError,
  });

  useEffect(() => {
    setUsers(usersQuery.data ?? []);
    setNotifications(notificationQuery.data ?? []);
  }, [notificationQuery.data, usersQuery.data]);

  const handleReadNotification = async (notification: Notification) => {
    if (!notification.read) {
      const result = readNotification.mutate({ id: notification.id });
      console.log("read notification", result);
    }
  };

  return (
    <div>
      {/* button and bell */}
      <div className="mt-[100px] flex items-center justify-between">
        <DialogNotification users={users} />
        <div
          className="relative cursor-pointer"
          onClick={() => {
            setShowList(!showList);
          }}
        >
          <BellIcon width={30} height={30} />
          <span className="absolute right-0 top-0 inline-flex items-center justify-center rounded-full bg-red-600 px-2 py-1 text-xs font-bold leading-none text-red-100">
            {notifications.filter((e) => !e.read).length ?? 0}
          </span>
        </div>
      </div>
      {showList && (
        <div>
          {notifications.map((item) => {
            return (
              <div key={item.id}>
                <NotificationItem
                  item={item}
                  onItemClick={handleReadNotification}
                />
              </div>
            );
          }) ?? <div></div>}
        </div>
      )}
    </div>
  );
}
