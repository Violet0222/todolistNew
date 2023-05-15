import React, { useState } from "react";
import { Input } from "./Input";
import s from "../ToDoList.module.css";
import { Button } from "./Button";

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
    } else {
      setError("The input cannot be empty.");
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
        className={error ? s.inputError : ""}
        onKeyDown={() => {
          if (error) {
            setError(null);
          }
        }}
      />
      <Button onClick={onAddTaskClickHandler}>+</Button>
      <div> {error && <div className={s.error}>{error}</div>}</div>
    </div>
  );
};
