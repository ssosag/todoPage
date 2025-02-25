import React, { useState, useRef, useEffect } from "react";
import { Todo as TodoType } from "../types";

interface TodoProps {
  completed: TodoType["completed"];
  title: TodoType["title"];
  isEditing: boolean;
  onEditingChange: (isEditing: boolean) => void;
  onCompleted: (completed: TodoType["completed"]) => void;
  onChangeTitle: (title: TodoType["title"]) => void;
  onDelete: () => void;
}

export const Todo: React.FC<TodoProps> = ({
  completed,
  title,
  isEditing,
  onEditingChange,
  onCompleted,
  onChangeTitle,
  onDelete,
}) => {
  const [titleEdited, setTitleEdited] = useState(title);
  const inputEditTitle = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputEditTitle.current?.focus();
    } else {
      inputEditTitle.current?.blur();
    }
  }, [isEditing]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      const newTitle = titleEdited.trim();
      setTitleEdited(newTitle);
      onEditingChange(false);

      if (newTitle !== title) {
        onChangeTitle(newTitle);
      }

      if (newTitle === "") {
        onDelete();
      }
    }

    if (e.key === "Escape") {
      setTitleEdited(title);
      onEditingChange(false);
    }
  };

  return (
    <>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={(e) => onCompleted(e.target.checked)}
        />
        <label onDoubleClick={() => onEditingChange(true)}>{title}</label>
        <button className="destroy" onClick={() => onDelete()} />
      </div>
      <input
        ref={inputEditTitle}
        className="edit"
        value={titleEdited}
        onKeyDown={handleKeyDown}
        onChange={(e) => setTitleEdited(e.target.value)}
        onBlur={() => {
          onEditingChange(false);
        }}
      />
    </>
  );
};
