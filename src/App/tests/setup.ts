import { expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";

// Костыль, чтобы тесты не падали из-за использования функции scrollTo в компоненте
// (в либе jsdom почему-то не имплементирован ряд методов, доступных в браузере)
Element.prototype.scrollTo = () => null;

expect.extend(matchers);
