import { Dispatch, SetStateAction, MouseEvent } from "react";
import { TodosVisibility } from "../model";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

type Props = {
  setType: Dispatch<SetStateAction<TodosVisibility>>;
  type: TodosVisibility;
};

export const SwitchTodosType = ({ type, setType }: Props) => {
  const handleChange = (
    _e: MouseEvent<HTMLElement>,
    newValue: TodosVisibility,
  ) => {
    setType(newValue);
  };
  return (
    <ToggleButtonGroup
      color="primary"
      value={type}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="all">All</ToggleButton>
      <ToggleButton value="active">Active</ToggleButton>
      <ToggleButton value="completed">Completed</ToggleButton>
    </ToggleButtonGroup>
  );
};
