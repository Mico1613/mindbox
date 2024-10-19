import styles from "./styles.module.scss";
import { TodoApp } from "../../../Widgets";

export const MainPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1>todos</h1>
      <TodoApp />
    </div>
  );
};
