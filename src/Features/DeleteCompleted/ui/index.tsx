import { Todo } from "../../../Entities";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@mui/material";

type Props = {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
};

export const DeleteCompleted = ({ setTodos }: Props) => {
  const handleClick = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };
  return (
    <Button onClick={handleClick} data-testid="delete-completed">
      Удалить выполненные
    </Button>
  );
};
