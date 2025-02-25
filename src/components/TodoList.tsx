import React, { useState } from "react";
import { Todo } from "./Todo";
import { Todo as TodoType, filterValue } from "../types";

interface TodoListProps {
  todos: Array<TodoType>;
  filter: filterValue;
  onCompletedTodo: (
    id: TodoType["id"],
    completed: TodoType["completed"]
  ) => void;
  onChangeTodoTitle: (id: TodoType["id"], title: TodoType["title"]) => void;
  onDeletedTodo: (id: TodoType["id"]) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  filter,
  onCompletedTodo,
  onChangeTodoTitle,
  onDeletedTodo,
}) => {
  const [idTodoEdited, setIdTodoEdited] = useState<TodoType["id"] | null>(null);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") {
      return todo.completed;
    } else if (filter === "active") {
      return !todo.completed;
    } else {
      return true;
    }
  });

  return (
    <section>
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className={`${todo.completed ? "completed" : ""}
            ${idTodoEdited === todo.id ? "editing" : ""}
          `}
          >
            <Todo
              completed={todo.completed}
              title={todo.title}
              isEditing={idTodoEdited === todo.id}
              onEditingChange={(isEditing) =>
                setIdTodoEdited(isEditing ? todo.id : null)
              }
              onCompleted={(completed) => {
                onCompletedTodo(todo.id, completed);
              }}
              onChangeTitle={(title) => {
                onChangeTodoTitle(todo.id, title);
              }}
              onDelete={() => {
                onDeletedTodo(todo.id);
              }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
