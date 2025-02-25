import { Todo } from "../types";

export class TodoService {
  static async getTodos(): Promise<Todo[]> {
    return JSON.parse(localStorage.getItem("todos") ?? "[]");
  }

  static async saveTodos(todos: Todo[]): Promise<boolean> {
    localStorage.setItem("todos", JSON.stringify(todos));
    return true;
  }
}
