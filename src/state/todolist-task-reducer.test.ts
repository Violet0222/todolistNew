import { addTodolistAC, todolistReducer } from "./todolist-reducer";
import { taskReducer } from "./taskReducer";
import { TasksStateType, ToDoListType } from "../App";

test("new array should be added when new todolist is added", () => {
  const startTaskState: TasksStateType = {};
  const startToDoListsState: Array<ToDoListType> = [];

  const action = addTodolistAC("new todolist", "2");
  const endTaskState = taskReducer(startTaskState, action);
  const endToDolistState = todolistReducer(startToDoListsState, action);

  const keys = Object.keys(endTaskState);
  const idFromTasks = keys[0];
  const idFromTodolist = endToDolistState[0].id;
  expect(idFromTasks).toBe(action.payload.newTodolistID);
  expect(idFromTodolist).toBe(action.payload.newTodolistID);
});
