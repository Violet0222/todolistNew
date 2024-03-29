type stateType = {
  age: number;
  childrenCount: number;
  name: string;
};
type actionType = {
  type: string;
  [key: string]: any;
};
export const testuserReducer = (
  state: stateType,
  action: actionType
): stateType => {
  switch (action.type) {
    case "INCREMENT-AGE":
      const newState = { ...state };
      newState.age = newState.age + 1;
      return newState;
    case "INCREMENT-CHILDREN-COUNT":
      return { ...state, childrenCount: state.childrenCount + 1 };
    case "CHANGE-NAME":
      return { ...state, name: action.newName };
    default:
      throw new Error("I don't understand this action type");
  }
};
