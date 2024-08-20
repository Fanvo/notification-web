"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { NotificationTypeEnum } from "~/app/utils/notificationtype";
import { api } from "~/trpc/react";
import NotificationPlatFormUpdate from "../platformUpdate";
import NotificationSelect from "../selectdData";

interface Props {
  users: User[];
}

const NotificationTypes = Object.values(NotificationTypeEnum) as [
  string,
  ...string[],
];
const getNotificationTypeLabel = (type: NotificationTypeEnum) => {
  switch (type) {
    case NotificationTypeEnum.PLATFORM_UPDATE:
      return "Platform Update";
    case NotificationTypeEnum.COMMENT_TAG:
      return "Comment Tag";
    case NotificationTypeEnum.ACCESS_GRANTED:
      return "Access granted";
    case NotificationTypeEnum.JOIN_WORKSPACE:
      return "Join workspace";
  }
};

const schema = z.object({
  type: z.enum(NotificationTypes, {
    required_error: "Notification is required",
  }),
  data: z.union([
    z.string().min(1, "Form is required").optional(),
    z.string().min(1, "Form is required").optional(),
    z.string().min(1, "Form is required").optional(),
    z.string().min(1, "Form is required").optional(),
  ]),
});

const DialogNotification = ({ users }: Props) => {
  const [showModal, setShowModal] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const notificationOptions = Object.values(NotificationTypeEnum).map(
    (value) => {
      return { value, label: getNotificationTypeLabel(value) };
    },
  );
  const notificationType = watch("type");
  const utils = api.useUtils();

  const onSuccess = async () => {
    await utils.invalidate();
    setShowModal(false);
  };
  const onError = (error: any, variables: any, context: any) => {
    console.log("Error add notification", { error, variables, context });
  };
  const createPlatformUpdate =
    api.notification.createPlatformUpdate.useMutation({
      onSuccess,
      onError,
    });
  const createCommentTag = api.notification.createCommentTag.useMutation({
    onSuccess,
    onError,
  });
  const createAccessGranted = api.notification.createAccessGranted.useMutation({
    onSuccess,
    onError,
  });
  const createJoinWorkspace = api.notification.createJoinWorkspace.useMutation({
    onSuccess,
    onError,
  });

  const onCreateNotification = (data: any) => {
    switch (notificationType) {
      case NotificationTypeEnum.PLATFORM_UPDATE:
        createPlatformUpdate.mutate({ version: data });
        break;
      case NotificationTypeEnum.COMMENT_TAG:
        createCommentTag.mutate({ userId: data });
        break;
      case NotificationTypeEnum.ACCESS_GRANTED:
        createAccessGranted.mutate({ userId: data });
        break;
      case NotificationTypeEnum.JOIN_WORKSPACE:
        createJoinWorkspace.mutate({ userId: data });
        break;
    }
  };

  const onSubmit = (item: any) => {
    onCreateNotification(item.data);
  };

  const handleCancelNotification = () => {
    setShowModal(false);
    reset();
  };

  const renderNotificationField = () => {
    switch (notificationType) {
      case NotificationTypeEnum.PLATFORM_UPDATE:
        return (
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="w-[90px] text-right text-[15px] text-violet11"
              htmlFor="platformUpdate"
            >
              Version
            </label>
            <Controller
              name="data"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <NotificationPlatFormUpdate
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="123"
                />
              )}
            />
          </fieldset>
        );
      case NotificationTypeEnum.COMMENT_TAG:
        return (
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="w-[90px] text-right text-[15px] text-violet11"
              htmlFor="commentTag"
            >
              User
            </label>
            <Controller
              name="data"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <NotificationSelect
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select user"
                  data={users.map((item) => {
                    return {
                      value: item.id.toString(),
                      label: item.username,
                    };
                  })}
                />
              )}
            />
          </fieldset>
        );
      case NotificationTypeEnum.ACCESS_GRANTED:
        return (
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="w-[90px] text-right text-[15px] text-violet11"
              htmlFor="accessGranted"
            >
              User
            </label>
            <Controller
              name="data"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <NotificationSelect
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select user"
                  data={users.map((item) => {
                    return {
                      value: item.id.toString(),
                      label: item.username,
                    };
                  })}
                />
              )}
            />
          </fieldset>
        );
      case NotificationTypeEnum.JOIN_WORKSPACE:
        return (
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="w-[90px] text-right text-[15px] text-violet11"
              htmlFor="joinWorkspace"
            >
              User
            </label>
            <Controller
              name="data"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <NotificationSelect
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select user"
                  data={users.map((item) => {
                    return {
                      value: item.id.toString(),
                      label: item.username,
                    };
                  })}
                />
              )}
            />
          </fieldset>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog.Root open={showModal} onOpenChange={setShowModal}>
      <Dialog.Trigger asChild>
        <button className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none text-violet11 shadow-[0_2px_10px] shadow-blackA4 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
          Add Notification
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-[17px] font-medium text-mauve12">
            Select Notification
          </Dialog.Title>
          <Dialog.Description className="mb-5 mt-[10px] text-[15px] leading-normal text-mauve11">
            Add notification here
          </Dialog.Description>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <label
                className="w-[90px] text-right text-[15px] text-violet11"
                htmlFor="type"
              >
                Notification
              </label>
              <Controller
                name="type"
                control={control}
                defaultValue=""
                render={({ field }) => {
                  return (
                    <NotificationSelect
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                        reset({ type: value, data: "" });
                      }}
                      data={notificationOptions}
                    />
                  );
                }}
              />
            </fieldset>
            {renderNotificationField()}
            {errors.data && (
              <p style={{ color: "red" }}>{errors.data.message?.toString()}</p>
            )}
            {errors.type && (
              <p style={{ color: "red" }}>
                {errors.type.type === "invalid_enum_value" &&
                  "Please select the type"}
              </p>
            )}
            <div className="flex justify-between">
              <button
                type="submit"
                className="mt-4 rounded bg-blue-500 p-2 text-white"
              >
                Submit
              </button>
              <button
                className="mt-4 rounded bg-red-500 p-2 text-white"
                onClick={handleCancelNotification}
              >
                Cancel
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogNotification;
