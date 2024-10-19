import styles from "./styles.module.scss";
import { AddTodo, DeleteCompleted, TodosVisibility } from "../../../Features";
import { Todo, TodoItem } from "../../../Entities";
import { useState } from "react";
import { getIncompleteTodosLength } from "../helpers";
import { SwitchTodosType } from "../../../Features/SwitchTodosType/ui";

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosVisibilityType, setTodosVisibilityType] =
    useState<TodosVisibility>("all");

  const addTodo = (todo: Todo) => {
    if (todos.length < 100) {
      setTodos((prev) => [...prev, todo]);
    }
  };

  return (
    <main className={styles.main}>
      <AddTodo addTodo={addTodo} />
      <ul className={styles.todoList}>
        {todos.map((todo) => {
          if (todosVisibilityType === "all") {
            return <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />;
          }
          if (todosVisibilityType === "active" && !todo.completed) {
            return <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />;
          }
          if (todosVisibilityType === "completed" && todo.completed) {
            return <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />;
          }
        })}
      </ul>
      <div className={styles.footer}>
        <span>Осталось выполнить: {getIncompleteTodosLength(todos)}</span>
        <SwitchTodosType
          setType={setTodosVisibilityType}
          type={todosVisibilityType}
        />
        <DeleteCompleted setTodos={setTodos} />
      </div>
    </main>
  );
};
