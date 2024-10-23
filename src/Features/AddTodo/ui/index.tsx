import { ChangeEventHandler, KeyboardEventHandler, useState } from "react";
import { v4 } from "uuid";
import { Todo } from "../../../Entities";
import styles from "./styles.module.scss";
import { Button, TextField } from "@mui/material";
import { MAX_INPUT_LENGTH } from "../model";

type Props = {
  addTodo: (todo: Todo) => void;
};

export const AddTodo = ({ addTodo }: Props) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      const todo = {
        id: v4(),
        text: inputValue.trim(),
        completed: false,
      };
      addTodo(todo);
      setInputValue("");
    }
  };

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div className={styles.wrapper}>
      <TextField
        type="text"
        variant="outlined"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Запишите, чтобы не забыть, что нужно сделать..."
        sx={{
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--primary-pink)",
          },
          "& .MuiInputBase-input": { color: "var(--secondary-grey)" },
        }}
        slotProps={{
          htmlInput: {
            maxLength: MAX_INPUT_LENGTH,
            "data-testid": "add-todo-input",
          },
        }}
      />
      <Button
        onClick={handleAddTodo}
        variant="outlined"
        data-testid="add-todo-button"
      >
        Добавить
      </Button>
    </div>
  );
};
