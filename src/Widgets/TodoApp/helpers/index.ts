import { Todo } from "../../../Entities";

export const getIncompleteTodosLength = (todos: Todo[]) => {
  return todos.filter((item) => !item.completed).length;
};
