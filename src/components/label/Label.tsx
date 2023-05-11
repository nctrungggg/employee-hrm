import React from "react";

interface Props {
  htmlFor: string;
  children: React.ReactNode;
}

const Label = ({ htmlFor, children, ...props }: Props) => {
  return (
    <label
      className="block mb-1 text-textPrimary text-base font-normal cursor-pointer"
      htmlFor={htmlFor}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
