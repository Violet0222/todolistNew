import { v1 } from "uuid";
import {
  addTaskAC,
  changeTaskTitleAC,
  // emptyTaskArrayforTodolistAC,
  handleRemoveClickAC,
  onChangeTaskStatusAC,
  taskReducer,
} from "./taskReducer";
import { todolist2 } from "../data";
import {
  addTodolistAC,
  addTodolistACType,
  handleToDoListRemoveClickAC,
} from "./todolist-reducer";

test("correct task should be deleted from correct array", () => {
  const startState = {
    todolist1: [
      { id: "1", name: "HTML&CSS", isDone: true },
      { id: "2", name: "JS", isDone: true },
      { id: "3", name: "React", isDone: false },
    ],
    toDoList2: [
      { id: "1", name: "HTML&CSS", isDone: true },
      { id: "2", name: "JS", isDone: true },
      { id: "3", name: "React", isDone: false },
    ],
  };
  const action = handleRemoveClickAC("toDoList2", "2");
  const endState = taskReducer(startState, action);

  expect(endState).toEqual({
    todolist1: [
      { id: "1", name: "HTML&CSS", isDone: true },
      { id: "2", name: "JS", isDone: true },
      { id: "3", name: "React", isDone: false },
    ],
    toDoList2: [
      { id: "1", name: "HTML&CSS", isDone: true },
      { id: "3", name: "React", isDone: false },
    ],
  });
});

test("correct task should be added to correct array", () => {
  const startState = {
    toDoList1: [
      { id: "1", name: "HTML&CSS", isDone: true },
      { id: "2", name: "JS", isDone: true },
      { id: "3", name: "React", isDone: false },
    ],
    toDoList2: [
      { id: "1", name: "HTML&CSS", isDone: true },
      { id: "2", name: "JS", isDone: true },
      { id: "3", name: "React", isDone: false },
    ],
  };

  const action = addTaskAC("toDoList2", "Java");
  const endState = taskReducer(startState, action);

  expect(endState["toDoList2"].length).toBe(4);
  expect(endState["toDoList1"].length).toBe(3);
  expect(endState["toDoList2"][3].name).toBe("Java");
  expect(endState["toDoList2"][0].name).toBeDefined();
});

test("task status should be changed", () => {
  const startState = {
    toDoList1: [
      { id: "1", name: "HTML&CSS", isDone: true },
      { id: "2", name: "JS", isDone: true },
      { id: "3", name: "React", isDone: false },
    ],
    toDoList2: [
      { id: "1", name: "HTML&CSS", isDone: true },
      { id: "2", name: "JS", isDone: true },
      { id: "3", name: "React", isDone: false },
    ],
  };

  const action = onChangeTaskStatusAC("toDoList2", "2", false);
  const endState = taskReducer(startState, action);

  expect(endState["toDoList2"][1].isDone).toBe(false);
});

test("title of specified task should be changed", () => {
  const startState = {
    toDoList1: [
      { id: "1", name: "HTML&CSS", isDone: true },
      { id: "2", name: "JS", isDone: true },
      { id: "3", name: "React", isDone: false },
    ],
    toDoList2: [
      { id: "1", name: "HTML&CSS", isDone: true },
      { id: "2", name: "JS", isDone: true },
      { id: "3", name: "React", isDone: false },
    ],
  };

  const action = changeTaskTitleAC("toDoList2", "2", "Java");
  const endState = taskReducer(startState, action);

  expect(endState["toDoList2"][1].name).toBe("Java");
});

test("new array should be added when new todolist is added", () => {
  const startState = {
    toDoList1: [
      { id: "1", name: "HTML&CSS", isDone: true },
      { id: "2", name: "JS", isDone: true },
      { id: "3", name: "React", isDone: false },
    ],
    toDoList2: [
      { id: "1", name: "HTML&CSS", isDone: true },
      { id: "2", name: "JS", isDone: true },
      { id: "3", name: "React", isDone: false },
    ],
  };

  const action = addTodolistAC("new todolist", "2");
  const endState = taskReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== "toDoList1" && k !== "toDoList2");
  if (!newKey) {
    throw Error("new key should be added");
  }
  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("array should be deleted when specified todolist is removed", () => {
  const startState = {
    toDoList1: [
      { id: "1", name: "HTML&CSS", isDone: true },
      { id: "2", name: "JS", isDone: true },
      { id: "3", name: "React", isDone: false },
    ],
    toDoList2: [
      { id: "1", name: "HTML&CSS", isDone: true },
      { id: "2", name: "JS", isDone: true },
      { id: "3", name: "React", isDone: false },
    ],
  };

  const action = handleToDoListRemoveClickAC("toDoList2");
  const endState = taskReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["toDoList2"]).not.toBeDefined();
});
