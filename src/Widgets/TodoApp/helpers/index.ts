import { Todo } from "../../../Entities";
import { TodosVisibility } from "../../../Features";
import { ReactElement, ReactNode } from "react";

export const getIncompleteTodosLength = (todos: Todo[]) => {
  return todos.filter((item) => !item.completed).length;
};

export const visibilityTypeConditionRender = (
  type: TodosVisibility,
  todoEl: Todo,
  component: ReactElement,
): ReactNode => {
  if (type === "all") {
    return component;
  }
  if (type === "active" && !todoEl.completed) {
    return component;
  }
  if (type === "completed" && todoEl.completed) {
    return component;
  }
};
