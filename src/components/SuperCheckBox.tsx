import React, { ChangeEvent } from "react";
import { purple } from "@mui/material/colors";
import { CheckCircle, Favorite } from "@mui/icons-material";
import { Checkbox } from "@mui/material";

type SuperCheckBoxProps = {
  checked: boolean;
  callback: (changeEvent: boolean) => void;
};

export const SuperCheckBox: React.FC<SuperCheckBoxProps> = ({
  checked,
  callback,
}) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    callback(e.currentTarget.checked);
  };

  return (
    <Checkbox
      checked={checked}
      onChange={onChangeHandler}
      sx={{
        color: purple[800],
        "&.Mui-checked": {
          color: purple[600],
        },
      }}
      icon={<Favorite />}
      checkedIcon={<CheckCircle />}
      size={"small"}
    />
  );
};
