import { ChangeEvent, KeyboardEvent } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";

type DefaultInputProps = Omit<TextFieldProps, "error">;

type InputPropsType = {
  onValueChange?: (value: string) => void;
  onEnter?: (toDoListID: string, title: string) => void;
  error?: string | null;
} & DefaultInputProps;
export const Input = ({
  onValueChange,
  onEnter,
  onChange,
  onKeyDown,
  error,
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
    <TextField
      variant="outlined"
      label="Type value"
      id="outlined-error"
      onChange={onChangeInputHandler}
      onKeyDown={onKeyPressHandler}
      error={!!error}
      helperText={error}
      {...rest}
    />
  );
};
