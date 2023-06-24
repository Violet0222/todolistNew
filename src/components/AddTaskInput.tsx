import React, { useState } from "react";
import { Input } from "./Input";
import s from "../ToDoList.module.css";
// import { Button } from "./Button";
import IconButton from "@mui/material/IconButton";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import { purple } from "@mui/material/colors";

type addTaskInputType = {
  addTask: (title: string) => void;
};
export const AddTaskInput = (props: addTaskInputType) => {
  const [error, setError] = useState<string | null>(null);
  const [inputTitle, setInputTitle] = useState(" ");
  const onAddTaskClickHandler = () => {
    if (inputTitle.trim() !== "") {
      props.addTask(inputTitle.trim());
      setInputTitle("");
      setError(null);
    } else {
      setError("The input can't be empty");
      // props.setInputTitle("");
      // props.addTitle();
    }
  };
  return (
    <div>
      <Input
        value={inputTitle}
        onValueChange={setInputTitle}
        onEnter={onAddTaskClickHandler}
        // className={error ? s.inputError : ""}
        onKeyDown={() => {
          if (error) {
            setError(null);
          }
        }}
        error={error}
      />
      <IconButton aria-label="add" onClick={onAddTaskClickHandler}>
        <PlaylistAddOutlinedIcon sx={{ color: purple[900] }} />
      </IconButton>

      {/*<div> {error && <div className={s.error}>{error}</div>}</div>*/}
    </div>
  );
};
