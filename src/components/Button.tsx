import { ButtonHTMLAttributes } from "react";

type DefaultButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonPropsType = DefaultButtonProps & {};

const Button = ({ ...rest }: ButtonPropsType) => {
  return <button {...rest} />;
};
