import { ChangeEvent } from "react";
import { useController } from "react-hook-form";

interface Props {
  type?: string;
  name?: string;
  placeholder?: string;
  control?: any;
  disabled?: boolean;
  className?: string;
}

const Input = ({
  type = "text",
  name = "",
  placeholder = "",
  control,
  className,
  ...props
}: Props) => {
  const { field } = useController({
    control,
    name,
  });

  return (
    <input
      type={type}
      id={name}
      placeholder={placeholder}
      {...field}
      {...props}
      className={`${className} rounded-md h-[46px]  bg-bgrGray  text-gray-600 outline-none  py-2 px-3 w-full text-base`}
    />
  );
};

export default Input;
