import { beforeEach, describe, expect, test } from "vitest";
import { TodoApp } from "../../../Widgets";
import { fireEvent, render, screen, within } from "@testing-library/react";

let addBtn: HTMLElement,
  addInput: HTMLElement,
  toggleTypeAllBtn: HTMLElement,
  toggleTypeActiveBtn: HTMLElement,
  toggleTypeCompletedBtn: HTMLElement;

beforeEach(() => {
  render(<TodoApp />);
  addBtn = screen.getByTestId("add-todo-button");
  addInput = screen.getByTestId("add-todo-input");
  toggleTypeAllBtn = screen.getByTestId("toggle-type-all");
  toggleTypeActiveBtn = screen.getByTestId("toggle-type-active");
  toggleTypeCompletedBtn = screen.getByTestId("toggle-type-completed");
});

describe("Switching types of todos visibility logic", () => {
  test("change pressed state on click", () => {
    expect(toggleTypeAllBtn).toHaveAttribute("aria-pressed", "true");
    expect(toggleTypeActiveBtn).not.toHaveAttribute("aria-pressed", "true");
    expect(toggleTypeCompletedBtn).not.toHaveAttribute("aria-pressed", "true");
    fireEvent.click(toggleTypeActiveBtn);
    expect(toggleTypeAllBtn).not.toHaveAttribute("aria-pressed", "true");
    expect(toggleTypeActiveBtn).toHaveAttribute("aria-pressed", "true");
    expect(toggleTypeCompletedBtn).not.toHaveAttribute("aria-pressed", "true");
    fireEvent.click(toggleTypeCompletedBtn);
    expect(toggleTypeAllBtn).not.toHaveAttribute("aria-pressed", "true");
    expect(toggleTypeActiveBtn).not.toHaveAttribute("aria-pressed", "true");
    expect(toggleTypeCompletedBtn).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(toggleTypeAllBtn);
    expect(toggleTypeAllBtn).toHaveAttribute("aria-pressed", "true");
    expect(toggleTypeActiveBtn).not.toHaveAttribute("aria-pressed", "true");
    expect(toggleTypeCompletedBtn).not.toHaveAttribute("aria-pressed", "true");
  });

  test("switching between all types of visibility and changing styles on check", () => {
    expect(screen.queryAllByTestId("todo-item")).toHaveLength(0);
    fireEvent.input(addInput, { target: { value: "1" } });
    fireEvent.click(addBtn);
    fireEvent.input(addInput, { target: { value: "2" } });
    fireEvent.click(addBtn);
    expect(screen.getAllByTestId("todo-item")).toHaveLength(2);

    const firstTodo = screen.getByTitle("1");
    const secondTodo = screen.getByTitle("2");
    fireEvent.click(firstTodo);
    expect(
      within(firstTodo).queryByRole("checkbox", {
        checked: true,
      }),
    ).toBeInTheDocument();
    expect(
      within(secondTodo).queryByRole("checkbox", {
        checked: true,
      }),
    ).not.toBeInTheDocument();
    fireEvent.click(secondTodo);
    expect(
      within(secondTodo).queryByRole("checkbox", {
        checked: true,
      }),
    ).toBeInTheDocument();
    fireEvent.click(firstTodo);
    expect(
      within(firstTodo).queryByRole("checkbox", {
        checked: true,
      }),
    ).not.toBeInTheDocument();

    fireEvent.click(toggleTypeActiveBtn);
    expect(screen.queryAllByTestId("todo-item")).toHaveLength(1);
    expect(screen.getByTitle("1")).toBeInTheDocument();
    fireEvent.click(toggleTypeCompletedBtn);
    expect(screen.queryAllByTestId("todo-item")).toHaveLength(1);
    expect(screen.getByTitle("2")).toBeInTheDocument();
    fireEvent.click(toggleTypeAllBtn);
    expect(screen.queryAllByTestId("todo-item")).toHaveLength(2);
  });
});
