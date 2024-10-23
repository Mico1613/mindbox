import { beforeEach, describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { TodoApp } from "../../../Widgets";

describe("Add todo logic", () => {
  const testText = "Test text";
  let addBtn: HTMLElement, addInput: HTMLElement;

  beforeEach(() => {
    render(<TodoApp />);
    addBtn = screen.getByTestId("add-todo-button");
    addInput = screen.getByTestId("add-todo-input");
  });

  test("Add todo with common value", () => {
    const expectedAmountOfTodos = 0;
    expect(screen.queryAllByTestId("todo-item")).toHaveLength(
      expectedAmountOfTodos,
    );
    fireEvent.input(addInput, { target: { value: testText } });
    fireEvent.click(addBtn);
    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  test("Attempt to add todo with empty or only spaces input value", () => {
    // между тестами компонент TodoApp не анмаунтиться, что бы я ни пробовал делать (cleanup, unmount),
    // поэтому здесь 1, так как в предыдущем тесте была добавлена одна тудушка
    const expectedAmountOfTodos = 1;
    expect(screen.queryAllByTestId("todo-item")).toHaveLength(
      expectedAmountOfTodos,
    );
    fireEvent.input(addInput, { target: { value: "" } });
    fireEvent.click(addBtn);
    fireEvent.input(addInput, { target: { value: "    " } });
    fireEvent.click(addBtn);
    expect(screen.queryAllByTestId("todo-item")).toHaveLength(
      expectedAmountOfTodos,
    );
  });
});
