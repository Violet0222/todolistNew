import React, { useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import { ToDoList } from "./ToDoList";

export type FilteredTaskType = "All" | "Active" | "Completed";

function App() {
  const [tasksState, setTasks] = useState([
    { id: v1(), name: "HTML&CSS", isDone: true },
    { id: v1(), name: "JS", isDone: true },
    { id: v1(), name: "React", isDone: false },
  ]);

  const handleRemoveClick = (id: string) => {
    setTasks((currentTask) => currentTask.filter((task) => id !== task.id));
  };
  //todo: хотела подумать как сделать через if чтобы показывались All, Active
  const [filter, setFilter] = useState<FilteredTaskType>("All");

  const filteredTasks = tasksState.filter((task) => {
    if (filter === "Active") {
      return !task.isDone;
    }
    if (filter === "Completed") {
      return task.isDone;
    }
    return true;
  });

  const handActiveClick = (nameButton: FilteredTaskType) => {
    setFilter(nameButton);
  };
  let [inputTitle, setInputTitle] = useState(" ");
  const addTitle = () => {
    const newInputTitle = {
      id: v1(),
      name: inputTitle,
      isDone: false,
    };
    setTasks([newInputTitle, ...tasksState]);
    setInputTitle(" ");
  };
  const onChangeTaskStatus = (taskId: string, eventStatus: boolean) => {
    // let task = tasksState.find((t) => t.id === taskId);
    // if (task) {
    //   task.isDone = isDone;
    // }
    setTasks(
      tasksState.map((el) =>
        el.id === taskId ? { ...el, isDone: eventStatus } : el
      )
    );
  };
  return (
    <div className="App">
      <ToDoList
        title={"What to do?"}
        filter={filter}
        filteredTasks={filteredTasks}
        handleRemoveClick={handleRemoveClick}
        handActiveClick={handActiveClick}
        inputTitle={inputTitle}
        setInputTitle={setInputTitle}
        addTitle={addTitle}
        onChangeTaskStatus={onChangeTaskStatus}
      />
    </div>
  );
}

export default App;
