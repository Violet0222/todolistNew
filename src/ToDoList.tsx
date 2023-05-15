import React, {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
  useState,
} from "react";
import { FilteredTaskType } from "./App";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import s from "./ToDoList.module.css";
import { AddTaskInput } from "./components/AddTaskInput";

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
  toDoListID: string;
  title: string;
  filter: FilteredTaskType;
  filteredTasks: Task[];
  handleToDoListRemoveClick: (toDoList: string) => void;
  handleRemoveClick: (toDoListID: string, taskID: string) => void;
  handActiveClick: (toDoListID: string, nameButton: FilteredTaskType) => void;
  addTask: (toDoListID: string, title: string) => void;
  onChangeTaskStatus: (
    toDoListID: string,
    taskID: string,
    eventStatus: boolean
  ) => void;
};

export const ToDoList = (props: FilteredPropsTitle) => {
  const onRemoveToDoListHandler = () =>
    props.handleToDoListRemoveClick(props.toDoListID);
  const onAllTasksClickHandler = () =>
    props.handActiveClick(props.toDoListID, "All");
  const onActiveTasksClickHandler = () =>
    props.handActiveClick(props.toDoListID, "Active");
  const onCompletedTasksClickHandler = () =>
    props.handActiveClick(props.toDoListID, "Completed");
  const onChangeHandler = (taskId: string, e: boolean) =>
    props.onChangeTaskStatus(props.toDoListID, taskId, e);
  const addTask = (title: string) => {
    props.addTask(title, props.toDoListID);
  };
  return (
    <div>
      <div>
        <div className={s.titleWrapper}>
          <h3>{props.title}</h3>
          <Button onClick={onRemoveToDoListHandler}>x</Button>
        </div>
        <div>
          <AddTaskInput addTask={addTask} />
        </div>
        <ul>
          {props.filteredTasks.map((task) => {
            const onRemoveHandler = () =>
              props.handleRemoveClick(props.toDoListID, task.id);
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
