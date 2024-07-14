import { ChangeEvent, FC, HTMLProps, useState } from "react";

type Props = HTMLProps<HTMLInputElement> & {
  onChange: (value: string) => void;
}

const Input: FC<Props> = ({
  defaultValue = "",
  onChange,
  ...props
}) => {
  const [value, setValue] = useState(defaultValue);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  }

  return (
    <input
      onChange={handleChange}
      className="p-3 rounded text-black"
      value={value}
      {...props}
    />
  );
};

export default Input;
