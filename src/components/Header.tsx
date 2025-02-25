import React from "react";
import { CreateTodo } from "./CreateTodo";

interface HeaderProps {
  title: string;
  onCreateTodo: (title: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onCreateTodo }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <CreateTodo onCreateTodo={onCreateTodo} />
    </header>
  );
};
