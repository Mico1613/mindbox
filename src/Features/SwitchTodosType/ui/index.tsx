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
    if (newValue) setType(newValue);
  };
  return (
    <ToggleButtonGroup
      color="primary"
      value={type}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="all" data-testid="toggle-type-all">
        All
      </ToggleButton>
      <ToggleButton value="active" data-testid="toggle-type-active">
        Active
      </ToggleButton>
      <ToggleButton value="completed" data-testid="toggle-type-completed">
        Completed
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
