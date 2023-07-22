import { testuserReducer } from "./testuserReduser";

test("user reducer should increment only age", () => {
  const startState = { age: 20, childrenCount: 2, name: "Nick" };
  const endState = testuserReducer(startState, { type: "INCREMENT-AGE" });
  expect(endState.age).toBe(21);
  expect(endState.childrenCount).toBe(2);
});

test("user reducer should increment only childrenCount", () => {
  const startState = { age: 20, childrenCount: 2, name: "Nick" };
  const endState = testuserReducer(startState, {
    type: "INCREMENT-CHILDREN-COUNT",
  });
  expect(endState.age).toBe(20);
  expect(endState.childrenCount).toBe(3);
});

test("user reducer should change user name", () => {
  const startState = { age: 20, childrenCount: 2, name: "Nick" };
  const newName = "Eagle";
  const endState = testuserReducer(startState, {
    type: "CHANGE-NAME",
    newName: "Eagle",
  } as const);
  expect(endState.age).toBe(20);
  expect(endState.name).toBe(newName);
});
