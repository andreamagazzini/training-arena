import { ChangeEvent, FC, useState } from "react";

type Props = {
  id: string;
  name: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  label?: string;
  placeholder?: string
  type?: string;
}

const Input: FC<Props> = ({
  id,
  name,
  onChange,
  defaultValue = "",
  label: _label,
  placeholder = "",
  type = "text"
}) => {
  const [value, setValue] = useState(defaultValue);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
  }

  return (
    <input
      onChange={handleChange}
      className="p-3 rounded"
      value={value}
      placeholder={placeholder}
      type={type}
      id={id}
      name={name}
    />
  );
};

export default Input;
