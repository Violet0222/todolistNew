import { ChangeEvent, InputHTMLAttributes, KeyboardEvent } from "react";

type DefaultInputProps = InputHTMLAttributes<HTMLInputElement>;

type InputPropsType = DefaultInputProps & {
  onValueChange?: (value: string) => void;
  onEnter?: (toDoListID: string, title: string) => void;
};
export const Input = ({
  onValueChange,
  onEnter,
  onChange,
  onKeyDown,
  ...rest
}: InputPropsType) => {
  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    onValueChange?.(event.currentTarget.value);
  };

  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    if (onEnter && event.key === "Enter") {
      onEnter(event.currentTarget.id, event.currentTarget.value);
      return;
    }
  };

  return (
    <input
      onChange={onChangeInputHandler}
      onKeyDown={onKeyPressHandler}
      {...rest}
    />
  );
};
