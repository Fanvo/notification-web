import * as Select from "@radix-ui/react-select";
import React from "react";

interface NotificationSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  data: {
    value: string;
    label: string;
  }[];
}

const NotificationSelect: React.FC<NotificationSelectProps> = ({
  value,
  onChange,
  placeholder = "Select a notification",
  data,
}) => {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]">
        <Select.Value placeholder={placeholder} />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="rounded-md bg-white shadow-lg">
          <Select.Viewport>
            {data.map((item) => (
              <Select.Item key={item.value} value={item.value} className="p-2">
                <Select.ItemText>{item.label}</Select.ItemText>
              </Select.Item>
            )) ?? (
              <Select.Item value={"Not found"} className="p-2">
                <Select.ItemText>{"Not found"}</Select.ItemText>
              </Select.Item>
            )}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default NotificationSelect;
