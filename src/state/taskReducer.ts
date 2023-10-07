import { TasksStateType } from "../App";
import { v1 } from "uuid";
import {
  addTodolistACType,
  handleToDoListRemoveClickACType,
} from "./todolist-reducer";
import { toDoListState1, toDoListState2 } from "../reducer/todolistReducer";

const initialState: TasksStateType = {
  [toDoListState1]: [
    { id: v1(), name: "HTML&CSS", isDone: true },
    { id: v1(), name: "JS", isDone: true },
    { id: v1(), name: "React", isDone: false },
  ],
  [toDoListState2]: [
    { id: v1(), name: "HTML&CSS", isDone: true },
    { id: v1(), name: "JS", isDone: true },
    { id: v1(), name: "React", isDone: false },
  ],
};
export const taskReducer = (
  state: TasksStateType = initialState,
  action: TsarType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.toDoListID]: state[action.payload.toDoListID].filter(
          (task) => task.id !== action.payload.taskID
        ),
      };
    }
    case "ADD-TASK": {
      const newTask = {
        id: v1(),
        name: action.payload.inputTitle,
        isDone: false,
      };
      return {
        ...state,
        [action.payload.toDoListID]: [
          ...state[action.payload.toDoListID],
          newTask,
        ],
      };
    }
    case "CHANGE-TASK-TITLE": {
      const newTask = {
        ...state,
        [action.payload.toDoListID]: state[action.payload.toDoListID].map(
          (el) =>
            el.id === action.payload.taskID
              ? { ...el, name: action.payload.newValue }
              : el
        ),
      };
      return newTask;
    }
    // case "EMPTY-TASK-ARRAY-FOR-TODOLIST": {
    //   return { ...state, [action.payload.newTodolistID]: [] };
    // }
    case "ADD-TODOLIST": {
      return { ...state, [action.payload.newTodolistID]: [] };
    }
    case "REMOVE-TODOLIST": {
      const {
        [action.id.toDoListID]: [],
        ...rest
      } = state;
      return rest;
      // let copyState = { ...state };
      // delete copyState[action.id.toDoListID];
      // return copyState;
    }
    case "CHANGE-TASK-STATUS": {
      const taskStatus = {
        ...state,
        [action.payload.toDoListID]: state[action.payload.toDoListID].map(
          (el) =>
            el.id === action.payload.taskID ? { ...el, isDone: !el.isDone } : el
        ),
      };
      return taskStatus;
    }

    default:
      return state;
  }
};

type TsarType =
  | handleRemoveClickACType
  | addTaskACType
  | onChangeTaskStatusACType
  | changeTaskTitleACType
  // | emptyTaskArrayforTodolistACType
  | addTodolistACType
  | handleToDoListRemoveClickACType;
type handleRemoveClickACType = ReturnType<typeof handleRemoveClickAC>;
export const handleRemoveClickAC = (toDoListID: string, taskID: string) => {
  return {
    type: "REMOVE-TASK",
    payload: { toDoListID, taskID },
  } as const;
};

type addTaskACType = ReturnType<typeof addTaskAC>;
export const addTaskAC = (toDoListID: string, inputTitle: string) => {
  return {
    type: "ADD-TASK",
    payload: { toDoListID, inputTitle },
  } as const;
};

type onChangeTaskStatusACType = ReturnType<typeof onChangeTaskStatusAC>;
export const onChangeTaskStatusAC = (
  toDoListID: string,
  taskID: string,
  eventStatus: boolean
) => {
  return {
    type: "CHANGE-TASK-STATUS",
    payload: { toDoListID, taskID, eventStatus },
  } as const;
};

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>;
export const changeTaskTitleAC = (
  toDoListID: string,
  taskID: string,
  newValue: string
) => {
  return {
    type: "CHANGE-TASK-TITLE",
    payload: { toDoListID, taskID, newValue },
  } as const;
};

// type emptyTaskArrayforTodolistACType = ReturnType<
//   typeof emptyTaskArrayforTodolistAC
// >;
// export const emptyTaskArrayforTodolistAC = (newTodolistID: string) => {
//   return {
//     type: "EMPTY-TASK-ARRAY-FOR-TODOLIST",
//     payload: { newTodolistID },
//   } as const;
// };
