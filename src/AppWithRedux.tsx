import React, { useReducer } from "react";
import { v1 } from "uuid";
import "./App.css";
import { Task, ToDoList } from "./ToDoList";
import { AddTaskInput } from "./components/AddTaskInput";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { purple } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import {
  addTaskAC,
  changeTaskTitleAC,
  // emptyTaskArrayforTodolistAC,
  handleRemoveClickAC,
  onChangeTaskStatusAC,
  taskReducer,
} from "./state/taskReducer";
import {
  addTodolistAC,
  changeTodolistTitleAC,
  handActiveClickAC,
  handleToDoListRemoveClickAC,
  todolistReducer,
} from "./reducer/todolistReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "./state/store";

export type FilteredTaskType = "All" | "Active" | "Completed";
export type ToDoListType = {
  id: string;
  title: string;
  filter: FilteredTaskType;
};
export type TasksStateType = {
  [key: string]: Array<Task>;
};

function AppWithRedux() {
  const dispatch = useDispatch();
  const toDoListState = useSelector<AppRootState, Array<ToDoListType>>(
    (state) => state.todolist
  );
  const tasksState = useSelector<AppRootState, TasksStateType>(
    (state) => state.task
  );

  const handleToDoListRemoveClick = (toDoListID: string) => {
    dispatch(handleToDoListRemoveClickAC(toDoListID));
  };
  const handleRemoveClick = (toDoListID: string, taskID: string) => {
    dispatch(handleRemoveClickAC(toDoListID, taskID));
  };

  const handActiveClick = (
    toDoListID: string,
    nameButton: FilteredTaskType
  ) => {
    dispatch(handActiveClickAC(toDoListID, nameButton));
  };

  const addTask = (toDoListID: string, inputTitle: string) => {
    dispatch(addTaskAC(toDoListID, inputTitle));
  };
  const onChangeTaskStatus = (
    toDoListID: string,
    taskID: string,
    eventStatus: boolean
  ) => {
    dispatch(onChangeTaskStatusAC(toDoListID, taskID, eventStatus));
  };
  const changeTaskTitle = ({
    toDoListID,
    taskID,
    newValue,
  }: {
    toDoListID: string;
    taskID: string;
    newValue: string;
  }) => {
    dispatch(changeTaskTitleAC(toDoListID, taskID, newValue));
  };

  const changeTodolistTitle = ({
    toDoListID,
    newValue,
  }: {
    toDoListID: string;
    newValue: string;
  }) => {
    dispatch(changeTodolistTitleAC(toDoListID, newValue));
  };
  const addTodolist = (title: string) => {
    let newTodolistID = v1();
    dispatch(addTodolistAC(title, newTodolistID));
    // dispatchTasks(emptyTaskArrayforTodolistAC(newTodolistID));
    // dispatchTasks(addTodolistAC(title, newTodolistID));
  };
  return (
    <div className="App">
      <AppBar position="static" style={{ background: purple[100] }}>
        <Toolbar variant="dense" sx={{ color: purple[100] }}>
          <IconButton
            edge="start"
            sx={{ color: purple[900] }}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ color: purple[900] }} component="div">
            Menu
          </Typography>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "15px" }}>
          <AddTaskInput addTask={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {toDoListState.map((list) => {
            const filteredTasks = tasksState[list.id].filter((task) => {
              if (list.filter === "Active") {
                return !task.isDone;
              }
              if (list.filter === "Completed") {
                return task.isDone;
              }
              return true;
            });
            return (
              <Grid item>
                <Paper style={{ padding: "15px" }}>
                  <ToDoList
                    key={list.id}
                    toDoListID={list.id}
                    title={list.title}
                    handleToDoListRemoveClick={handleToDoListRemoveClick}
                    filter={list.filter}
                    filteredTasks={filteredTasks}
                    handleRemoveClick={handleRemoveClick}
                    handActiveClick={handActiveClick}
                    addTask={addTask}
                    onChangeTaskStatus={onChangeTaskStatus}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
