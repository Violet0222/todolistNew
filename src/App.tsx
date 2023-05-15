import React, { useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import { ToDoList } from "./ToDoList";
import { AddTaskInput } from "./components/AddTaskInput";

export type FilteredTaskType = "All" | "Active" | "Completed";
type ToDoListType = {
  id: string;
  title: string;
  filter: FilteredTaskType;
};
function App() {
  let toDoListState1 = v1();
  let toDoListState2 = v1();
  const [toDoListState, setToDoListState] = useState<Array<ToDoListType>>([
    { id: toDoListState1, title: "what to do", filter: "All" },
    { id: toDoListState2, title: "what to buy", filter: "All" },
  ]);
  const [tasksState, setTasks] = useState({
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
  });
  const handleToDoListRemoveClick = (toDoListID: string) => {
    setToDoListState(
      toDoListState.filter((toDoList) => toDoList.id !== toDoListID)
    );
    delete tasksState[toDoListID];
  };
  const handleRemoveClick = (toDoListID: string, taskID: string) => {
    setTasks({
      ...tasksState,
      [toDoListID]: tasksState[toDoListID].filter((task) => task.id !== taskID),
    });
  };
  //todo: хотела подумать как сделать через if чтобы показывались All, Active
  // const [filter, setFilter] = useState<FilteredTaskType>("All");

  const handActiveClick = (
    toDoListID: string,
    nameButton: FilteredTaskType
  ) => {
    // setFilter(nameButton);
    setToDoListState(
      toDoListState.map((el) =>
        el.id === toDoListID ? { ...el, filter: nameButton } : el
      )
    );
  };

  const addTask = (toDoListID: string, inputTitle: string) => {
    const newTask = {
      id: v1(),
      name: inputTitle,
      isDone: false,
    };
    setTasks({
      ...tasksState,
      [toDoListID]: [...tasksState[toDoListID], newTask],
    });
  };
  const onChangeTaskStatus = (
    toDoListID: string,
    taskID: string,
    eventStatus: boolean
  ) => {
    // let task = tasksState.find((t) => t.id === taskId);
    // if (task) {
    //   task.isDone = isDone;
    // }
    setTasks({
      ...tasksState,
      [toDoListID]: tasksState[toDoListID].map((el) =>
        el.id === taskID ? { ...el, isDone: eventStatus } : el
      ),
    });
  };
  const addTodolist = (title: string) => {
    let newTodolist: ToDoListType = { id: v1(), title: title, filter: "All" };
    setToDoListState([newTodolist, ...toDoListState]);
    setTasks({ ...tasksState, [newTodolist.id]: [] });
  };
  return (
    <div className="App">
      <AddTaskInput addTask={addTodolist} />
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
          />
        );
      })}
    </div>
  );
}

export default App;
