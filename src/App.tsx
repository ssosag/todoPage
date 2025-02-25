import React, { useState, useEffect } from "react";
import "todomvc-app-css/index.css";
import { Header } from "./components/Header";
import { TodoList } from "./components/TodoList";
import { Footer } from "./components/Footer";
import { filterValue, Todo as TodoType } from "./types";

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Array<TodoType>>([]);

  const [filter, setFilter] = useState<filterValue>("all");

  useEffect(() => {
    console.log("Filter changed:", filter);
  }, [filter]);

  function handleSaveTodo(title: TodoType["title"]) {
    setTodos([...todos, { id: crypto.randomUUID(), title, completed: false }]);
  }

  function onCompletedTodo(
    id: TodoType["id"],
    completed: TodoType["completed"]
  ) {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: completed } : t))
    );
  }

  function onChangeTodoTitle(id: TodoType["id"], title: TodoType["title"]) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, title: title } : t)));
  }

  function onDeletedTodo(id: TodoType["id"]) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  const completeCount = todos.filter((t) => t.completed).length;
  const activeCount = todos.length - completeCount;

  function handleFilterChange(filter: filterValue) {
    setFilter(filter);
  }

  function handleClearCompleted() {
    setTodos(todos.filter((todo) => !todo.completed));
  }

  return (
    <div className="todoapp">
      <Header title="todos" onCreateTodo={handleSaveTodo} />
      <TodoList
        todos={todos}
        filter={filter}
        onCompletedTodo={onCompletedTodo}
        onChangeTodoTitle={onChangeTodoTitle}
        onDeletedTodo={onDeletedTodo}
      />
      <Footer
        activeCount={activeCount}
        completedCount={completeCount}
        filterSelected={filter}
        setFilterChange={handleFilterChange}
        onClearCompleted={handleClearCompleted}
      />
    </div>
  );
};
