import { FC, useState } from "react";
import { Todo } from "../types";

interface CreateTodoProps {
  onCreateTodo: (title: Todo["title"]) => void;
}

export const CreateTodo: FC<CreateTodoProps> = ({ onCreateTodo }) => {
  const [value, setValue] = useState("");
  return (
    <input
      className="new-todo"
      placeholder="Que vas a hacer hoy?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && value.trim() !== "") {
          onCreateTodo(value.trim());
          setValue("");
        }
      }}
      autoFocus
    />
  );
};
