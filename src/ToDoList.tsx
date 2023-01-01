import React from "react";
import { FilteredTaskType } from "./App";
import { Button } from "./components/Button";
import { Input } from "./components/Input";

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
  filteredTasks: Task[];
  handleRemoveClick: (id: string) => void;
  handActiveClick: (nameButton: FilteredTaskType) => void;
  inputTitle: string;
  setInputTitle: (title: string) => void;
  addTitle: () => void;
};

export const ToDoList = (props: FilteredPropsTitle) => {
  const onAddTaskClickHandler = () => {
    props.addTitle();
  };

  const onAllTasksClickHandler = () => props.handActiveClick("All");
  const onActiveTasksClickHandler = () => props.handActiveClick("Active");
  const onCompletedTasksClickHandler = () => props.handActiveClick("Completed");

  return (
    <div>
      <div>
        <h3>{props.title}</h3>
        <div>
          <Input
            value={props.inputTitle}
            onValueChange={props.setInputTitle}
            onEnter={props.addTitle}
          />
          <Button onClick={onAddTaskClickHandler}>+</Button>
        </div>
        <ul>
          {props.filteredTasks.map((task) => {
            const onRemoveHandler = () => props.handleRemoveClick(task.id);
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.name}</span>
                <Button onClick={onRemoveHandler}>x</Button>
              </li>
            );
          })}
        </ul>
        <div>
          <Button onClick={onAllTasksClickHandler}>All</Button>
          <Button onClick={onActiveTasksClickHandler}>Active</Button>
          <Button onClick={onCompletedTasksClickHandler}>Completed</Button>
        </div>
      </div>
    </div>
  );
};
