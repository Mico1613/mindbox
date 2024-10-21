import { Todo } from "../model";
import styles from "./styles.module.scss";
import { Checkbox } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import cn from "classnames";

type Props = {
  todo: Todo;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
};

export const TodoItem = ({ todo, setTodos }: Props) => {
  const handleClick = () => {
    setTodos((prev) => {
      const arr = [...prev];
      const currentTodo = arr.find((item) => item.id === todo.id);
      if (currentTodo) {
        currentTodo.completed = !currentTodo.completed;
        return arr;
      }
      return prev;
    });
  };
  return (
    <button className={styles.todo} onClick={handleClick} title={todo.text}>
      <Checkbox checked={todo.completed} />
      <span className={cn({ [styles.completedTodoText]: todo.completed })}>
        {todo.text}
      </span>
    </button>
  );
};
