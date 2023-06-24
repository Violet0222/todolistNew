import React, { ChangeEvent, useState } from "react";

type EditableTaskType = {
  name: string;
  onChange: (newValue: string) => void;
};
export const EditableTask = (props: EditableTaskType) => {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState("");
  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.name);
  };
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  return editMode ? (
    <input
      value={title}
      onChange={onChangeTitleHandler}
      onBlur={activateViewMode}
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.name}</span>
  );
};
