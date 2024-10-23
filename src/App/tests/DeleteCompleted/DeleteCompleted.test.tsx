import { expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { TodoApp } from "../../../Widgets";

test("delete completed todos", () => {
  render(<TodoApp />);
  const addBtn = screen.getByTestId("add-todo-button");
  const addInput = screen.getByTestId("add-todo-input");
  const deleteBtn = screen.getByTestId("delete-completed");

  expect(screen.queryAllByTestId("todo-item")).toHaveLength(0);
  fireEvent.input(addInput, { target: { value: "1" } });
  fireEvent.click(addBtn);
  fireEvent.input(addInput, { target: { value: "2" } });
  fireEvent.click(addBtn);
  expect(screen.queryAllByTestId("todo-item")).toHaveLength(2);

  const firstTodo = screen.getByTitle("1");
  const secondTodo = screen.getByTitle("2");
  fireEvent.click(firstTodo);
  fireEvent.click(deleteBtn);
  expect(screen.queryAllByTestId("todo-item")).toHaveLength(1);
  expect(screen.queryByTitle("1")).not.toBeInTheDocument();
  expect(screen.queryByTitle("2")).toBeInTheDocument();
  fireEvent.click(secondTodo);
  fireEvent.click(deleteBtn);
  expect(screen.queryAllByTestId("todo-item")).toHaveLength(0);
});
