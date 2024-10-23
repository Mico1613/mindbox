import styles from "./styles.module.scss";
import { AddTodo, DeleteCompleted, TodosVisibility } from "../../../Features";
import { Todo, TodoItem } from "../../../Entities";
import { useEffect, useRef, useState } from "react";
import {
  getIncompleteTodosLength,
  visibilityTypeConditionRender,
} from "../helpers";
import { SwitchTodosType } from "../../../Features";
import { useLocalStorage } from "../../../Shared";
import { MAX_TODOS_LENGTH } from "../model";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = () =>
  toast(
    `Вы создали слишком много тудушек. Их должно быть не больше ${MAX_TODOS_LENGTH}.`,
  );

export const TodoApp = () => {
  const [localStorageValue, setLocalStorageStateValue] =
    useLocalStorage<Todo[]>("todos");

  const [todos, setTodos] = useState<Todo[]>(localStorageValue ?? []);

  const [todosVisibilityType, setTodosVisibilityType] =
    useState<TodosVisibility>("all");

  const todoListRef = useRef<HTMLUListElement>(null);

  const addTodo = (todo: Todo) => {
    if (todos.length < MAX_TODOS_LENGTH) {
      setTodos((prev) => [...prev, todo]);
    }
    if (todos.length === MAX_TODOS_LENGTH - 1) {
      notify();
    }
  };

  useEffect(() => {
    setLocalStorageStateValue(todos);
  }, [setLocalStorageStateValue, todos]);

  useEffect(() => {
    const list = todoListRef.current;

    if (list && todos.length !== localStorageValue?.length) {
      list.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
    }
  }, [todos.length]);

  return (
    <main className={styles.main}>
      <AddTodo addTodo={addTodo} />
      <ul className={styles.todoList} ref={todoListRef}>
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
      <ToastContainer />
    </main>
  );
};
