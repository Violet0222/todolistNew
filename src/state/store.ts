import { combineReducers, createStore } from "redux";
import { taskReducer } from "./taskReducer";
import { todolistReducer } from "../reducer/todolistReducer";
import { TasksStateType, ToDoListType } from "../App";

const rootReducer = combineReducers({
  todolist: todolistReducer,
  task: taskReducer,
});

// type AppRootState = {
//   todolist: Array<ToDoListType>;
//   task: TasksStateType;
// };

export type AppRootState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;
