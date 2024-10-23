import styles from "./styles.module.scss";
import { AddTodo, DeleteCompleted, TodosVisibility } from "../../../Features";
import { Todo, TodoItem } from "../../../Entities";
import { useEffect, useState } from "react";
import {
  getIncompleteTodosLength,
  visibilityTypeConditionRender,
} from "../helpers";
import { SwitchTodosType } from "../../../Features";
import { useLocalStorage } from "../../../Shared";
import { MAX_TODOS_LENGTH } from "../model";

export const TodoApp = () => {
  const [localStorageValue, setLocalStorageStateValue] =
    useLocalStorage<Todo[]>("todos");

  const [todos, setTodos] = useState<Todo[]>(localStorageValue ?? []);

  const [todosVisibilityType, setTodosVisibilityType] =
    useState<TodosVisibility>("all");

  const addTodo = (todo: Todo) => {
    if (todos.length < MAX_TODOS_LENGTH) {
      setTodos((prev) => [...prev, todo]);
    }
  };

  useEffect(() => {
    setLocalStorageStateValue(todos);
  }, [setLocalStorageStateValue, todos]);

  return (
    <main className={styles.main}>
      <AddTodo addTodo={addTodo} />
      <ul className={styles.todoList}>
        {todos.map((todo) =>
          visibilityTypeConditionRender(
            todosVisibilityType,
            todo,
            <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />,
          ),
        )}
      </ul>
      <div className={styles.footer}>
        <span data-testid="remains-to-complete">
          Осталось выполнить: {getIncompleteTodosLength(todos)}
        </span>
        <SwitchTodosType
          setType={setTodosVisibilityType}
          type={todosVisibilityType}
        />
        <DeleteCompleted setTodos={setTodos} />
      </div>
    </main>
  );
};
