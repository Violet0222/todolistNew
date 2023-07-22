import { v1 } from "uuid";
import { FilteredTaskType, ToDoListType } from "../App";
import {
  addTodolistAC,
  changeTodolistTitleAC,
  handActiveClickAC,
  handleToDoListRemoveClickAC,
  todolistReducer,
} from "./todolist-reducer";

test("correct todolist should be removed", () => {
  let toDoListState1 = v1();
  let toDoListState2 = v1();
  const startState: Array<ToDoListType> = [
    { id: toDoListState1, title: "What to do", filter: "All" },
    { id: toDoListState2, title: "What to buy", filter: "All" },
  ];
  const endState = todolistReducer(
    startState,
    handleToDoListRemoveClickAC(toDoListState1)
  );
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(toDoListState2);
});

test("new todolist title should be added", () => {
  let toDoListState1 = v1();
  let toDoListState2 = v1();
  let newTodolistID = v1();
  let title = "To buy new close for my dog";

  const startState: Array<ToDoListType> = [
    { id: toDoListState1, title: "What to do", filter: "All" },
    { id: toDoListState2, title: "What to buy", filter: "All" },
  ];
  const endState = todolistReducer(
    startState,
    addTodolistAC(title, newTodolistID)
  );
  expect(endState.length).toBe(3);
  expect(endState[0].id).toBe(newTodolistID);
  expect(endState[0].title).toBe("To buy new close for my dog");
  expect(endState[0].filter).toBe("All");
});

test("tasks in the todolist should be filtered", () => {
  let toDoListState1 = v1();
  let toDoListState2 = v1();
  let nameButton: FilteredTaskType = "Active";

  const startState: Array<ToDoListType> = [
    { id: toDoListState1, title: "What to do", filter: "All" },
    { id: toDoListState2, title: "What to buy", filter: "All" },
  ];
  const endState = todolistReducer(
    startState,
    handActiveClickAC(toDoListState1, nameButton)
  );
  expect(endState.length).toBe(2);
  expect(endState[0].filter).toBe("Active");
});

test("todolist title should be changed", () => {
  let toDoListState1 = v1();
  let toDoListState2 = v1();
  let newValue = "What to finish";

  const startState: Array<ToDoListType> = [
    { id: toDoListState1, title: "What to do", filter: "All" },
    { id: toDoListState2, title: "What to buy", filter: "All" },
  ];
  const endState = todolistReducer(
    startState,
    changeTodolistTitleAC(toDoListState1, newValue)
  );
  expect(endState.length).toBe(2);
  expect(endState[0].title).toBe("What to finish");
});
