import { ButtonHTMLAttributes } from "react";

type DefaultButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonPropsType = DefaultButtonProps & {};

export const Button = ({ ...rest }: ButtonPropsType) => {
  return <button {...rest} />;
};
