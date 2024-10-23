import { expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { TodoApp } from "../../../Widgets";

test("check amount of incomplete todos", () => {
  render(<TodoApp />);
  const incompleteTodosAmount = screen.getByTestId("remains-to-complete");
  const addBtn = screen.getByTestId("add-todo-button");
  const addInput = screen.getByTestId("add-todo-input");

  expect(incompleteTodosAmount).toHaveTextContent("0");

  fireEvent.input(addInput, { target: { value: "1" } });
  fireEvent.click(addBtn);
  fireEvent.input(addInput, { target: { value: "2" } });
  fireEvent.click(addBtn);

  expect(incompleteTodosAmount).toHaveTextContent("2");

  const firstTodo = screen.getByTitle("1");
  const secondTodo = screen.getByTitle("2");

  fireEvent.click(firstTodo);

  expect(incompleteTodosAmount).toHaveTextContent("1");

  fireEvent.click(secondTodo);

  expect(incompleteTodosAmount).toHaveTextContent("0");

  fireEvent.click(firstTodo);
  fireEvent.click(secondTodo);

  expect(incompleteTodosAmount).toHaveTextContent("2");
});
