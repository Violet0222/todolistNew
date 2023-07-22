import React from "react";
import { FilteredTaskType } from "./App";
// import { Button } from "./components/Button";
import Button from "@mui/material/Button";
import s from "./ToDoList.module.css";
import { AddTaskInput } from "./components/AddTaskInput";
import { EditableTask } from "./components/EditableTask";
import {
  ButtonGroup,
  createTheme,
  IconButton,
  ThemeProvider,
} from "@mui/material";
import { purple } from "@mui/material/colors";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import { SuperCheckBox } from "./components/SuperCheckBox";

export type Task = {
  id: string;
  name: string;
  isDone: boolean;
};
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
  changeTaskTitle: ({
    toDoListID,
    taskID,
    newValue,
  }: {
    toDoListID: string;
    taskID: string;
    newValue: string;
  }) => void;
  changeTodolistTitle: ({
    toDoListID,
    newValue,
  }: {
    toDoListID: string;
    newValue: string;
  }) => void;
};
const theme = createTheme({
  palette: {
    primary: {
      main: "#e1bee7",
    },
  },
});
export const ToDoList = (props: FilteredPropsTitle) => {
  const onRemoveToDoListHandler = () =>
    props.handleToDoListRemoveClick(props.toDoListID);
  const onAllTasksClickHandler = () =>
    props.handActiveClick(props.toDoListID, "All");
  const onActiveTasksClickHandler = () =>
    props.handActiveClick(props.toDoListID, "Active");
  const onCompletedTasksClickHandler = () =>
    props.handActiveClick(props.toDoListID, "Completed");

  const addTask = (title: string) => {
    props.addTask(props.toDoListID, title);
  };
  const onChangeTodolistTitleHandler = (newValue: string) => {
    props.changeTodolistTitle({
      toDoListID: props.toDoListID,
      newValue,
    });
  };

  const onChangeStatusHandler = (taskID: string, changeEvent: boolean) => {
    props.onChangeTaskStatus(props.toDoListID, taskID, changeEvent);
  };
  return (
    <div>
      <div>
        <div className={s.titleWrapper}>
          <h3>
            <EditableTask
              name={props.title}
              onChange={onChangeTodolistTitleHandler}
            />
          </h3>
          <IconButton aria-label="delete" onClick={onRemoveToDoListHandler}>
            <DeleteForeverTwoToneIcon sx={{ color: purple[100] }} />
          </IconButton>
        </div>
        <div>
          <AddTaskInput addTask={addTask} />
        </div>
        <ul>
          {props.filteredTasks.map((task) => {
            // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            //   let newIsDoneValue = e.currentTarget.checked;
            //   props.onChangeTaskStatus(
            //     props.toDoListID,
            //     task.id,
            //     newIsDoneValue
            //   );
            // };

            const onRemoveHandler = () =>
              props.handleRemoveClick(props.toDoListID, task.id);
            //const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
            // props.onChangeTaskStatus(task.id, e.currentTarget.checked);
            const onChangeTitleHandler = (newValue: string) => {
              props.changeTaskTitle({
                toDoListID: props.toDoListID,
                taskID: task.id,
                newValue,
              });
            };
            return (
              <div key={task.id} className={task.isDone ? s.isDone : ""}>
                <SuperCheckBox
                  callback={(changeEvent) =>
                    onChangeStatusHandler(task.id, changeEvent)
                  }
                  checked={task.isDone}
                />

                <EditableTask
                  name={task.name}
                  onChange={onChangeTitleHandler}
                />
                <IconButton aria-label="delete" onClick={onRemoveHandler}>
                  <DeleteForeverTwoToneIcon sx={{ color: purple[100] }} />
                </IconButton>
              </div>
            );
          })}
        </ul>
        <div>
          <ThemeProvider theme={theme}>
            <ButtonGroup aria-label="outlined button group" size="small">
              <Button
                onClick={onAllTasksClickHandler}
                variant={props.filter === "All" ? "contained" : "text"}
              >
                All
              </Button>
              <Button
                onClick={onActiveTasksClickHandler}
                variant={props.filter === "Active" ? "contained" : "text"}
              >
                Active
              </Button>
              <Button
                onClick={onCompletedTasksClickHandler}
                variant={props.filter === "Completed" ? "contained" : "text"}
              >
                Completed
              </Button>
            </ButtonGroup>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};
