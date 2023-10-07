import { FilteredTaskType, ToDoListType } from "../App";
import { v1 } from "uuid";

export let toDoListState1 = v1();
export let toDoListState2 = v1();
const initialState: ToDoListType[] = [
  { id: toDoListState1, title: "What to do", filter: "All" },
  { id: toDoListState2, title: "What to buy", filter: "All" },
];
export const todolistReducer = (
  state: ToDoListType[] = initialState,
  action: mainType
): ToDoListType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      const updatedState = state.filter(
        (toDoList) => toDoList.id !== action.payload.toDoListID
      );
      return updatedState;
    }
    case "FILTER-TASK": {
      return state.map((el) =>
        el.id === action.payload.toDoListID
          ? { ...el, filter: action.payload.nameButton }
          : el
      );
    }
    case "CHANGE-TODOLIST-TITLE": {
      const newTodolist = state.map((el) =>
        el.id === action.payload.toDoListID
          ? { ...el, title: action.payload.newValue }
          : el
      );
      return newTodolist;
    }
    case "ADD-TODOLIST": {
      let newTodolist: ToDoListType = {
        id: action.payload.newTodolistID,
        title: action.payload.title,
        filter: "All",
      };
      return [newTodolist, ...state];
    }
    default:
      return state;
  }
};

type mainType =
  | handleToDoListRemoveClickACType
  | handActiveClickACType
  | changeTodolistTitleACType
  | addTodolistACType;

type handleToDoListRemoveClickACType = ReturnType<
  typeof handleToDoListRemoveClickAC
>;
export const handleToDoListRemoveClickAC = (toDoListID: string) => {
  return { type: "REMOVE-TODOLIST", payload: { toDoListID } } as const;
};

type handActiveClickACType = ReturnType<typeof handActiveClickAC>;
export const handActiveClickAC = (
  toDoListID: string,
  nameButton: FilteredTaskType
) => {
  return { type: "FILTER-TASK", payload: { toDoListID, nameButton } } as const;
};

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>;
export const changeTodolistTitleAC = (toDoListID: string, newValue: string) => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    payload: { toDoListID, newValue },
  } as const;
};

type addTodolistACType = ReturnType<typeof addTodolistAC>;
export const addTodolistAC = (title: string, newTodolistID: string) => {
  return {
    type: "ADD-TODOLIST",
    payload: { title, newTodolistID },
  } as const;
};
