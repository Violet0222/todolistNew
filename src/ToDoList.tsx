import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { FilteredTaskType } from "./App";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import s from "./ToDoList.module.css";

export type Task = {
  id: string;
  name: string;
  isDone: boolean;
};
// type PropsTitle = {
//   title: string;
//   myNumber?: number;
//   tasks: Array<Task>;
// };
type FilteredPropsTitle = {
  title: string;
  filter: FilteredTaskType;
  filteredTasks: Task[];
  handleRemoveClick: (id: string) => void;
  handActiveClick: (nameButton: FilteredTaskType) => void;
  inputTitle: string;
  setInputTitle: (title: string) => void;
  addTitle: () => void;
  onChangeTaskStatus: (taskId: string, eventStatus: boolean) => void;
};

export const ToDoList = (props: FilteredPropsTitle) => {
  let [error, setError] = useState<string | null>(null);
  const onAddTaskClickHandler = () => {
    if (props.inputTitle.trim() !== "") {
      props.addTitle();
      props.setInputTitle("");
    } else {
      setError("The input cannot be empty.");
      // props.setInputTitle("");
      // props.addTitle();
    }
  };

  const onAllTasksClickHandler = () => props.handActiveClick("All");
  const onActiveTasksClickHandler = () => props.handActiveClick("Active");
  const onCompletedTasksClickHandler = () => props.handActiveClick("Completed");
  const onChangeHandler = (taskId: string, e: boolean) =>
    props.onChangeTaskStatus(taskId, e);

  return (
    <div>
      <div>
        <h3>{props.title}</h3>
        <div>
          <Input
            value={props.inputTitle}
            onValueChange={props.setInputTitle}
            onEnter={props.addTitle}
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
        <ul>
          {props.filteredTasks.map((task) => {
            const onRemoveHandler = () => props.handleRemoveClick(task.id);
            //const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
            // props.onChangeTaskStatus(task.id, e.currentTarget.checked);
            return (
              <li key={task.id} className={task.isDone ? s.isDone : ""}>
                <input
                  type="checkbox"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onChangeHandler(task.id, e.currentTarget.checked)
                  }
                  checked={task.isDone}
                />
                <span>{task.name}</span>
                <Button onClick={onRemoveHandler}>x</Button>
              </li>
            );
          })}
        </ul>
        <div>
          <Button
            onClick={onAllTasksClickHandler}
            className={props.filter === "All" ? s.activeFilter : ""}
          >
            All
          </Button>
          <Button
            onClick={onActiveTasksClickHandler}
            className={props.filter === "Active" ? s.activeFilter : ""}
          >
            Active
          </Button>
          <Button
            onClick={onCompletedTasksClickHandler}
            className={props.filter === "Completed" ? s.activeFilter : ""}
          >
            Completed
          </Button>
        </div>
      </div>
    </div>
  );
};
