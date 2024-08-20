import React from "react";

interface TextFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const NotificationPlatFormUpdate: React.FC<TextFieldProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded border p-2"
    />
  );
};

export default NotificationPlatFormUpdate;
