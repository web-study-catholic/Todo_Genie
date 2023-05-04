import "./App.css";
import TodoHeader from "./TodoHeader";
import TodoLayout from "./TodoLayout";
import { createGlobalStyle } from "styled-components";
import TodoCreate from "./TodoCreate";
import TodoList from "./TodoList";
import { useRef, useState, useCallback } from "react";

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  const dataId = useRef(0);

  const [data, setData] = useState([]);
  const onSubmit = useCallback((newTodo) => {
    const newData = {
      id: dataId.current,
      text: newTodo,
    };
    dataId.current += 1;
    setData((prevData) => [newData, ...prevData]);
  }, []);

  const onRemove = useCallback(
    (targetId) => {
      const NewTodoList = data.filter((it) => it.id !== targetId);
      setData(NewTodoList);
    },
    [data]
  );
  const onToggle = useCallback(
    (targetId) => {
      const NewTodoList = data.map((item) =>
        item.id === targetId ? { ...item, done: !item.done } : item
      );
      setData(NewTodoList);
    },
    [data]
  );
  return (
    <div className="App">
      <GlobalStyle />
      <TodoLayout>
        <TodoHeader />
        <TodoList onRemove={onRemove} todolist={data} onToggle={onToggle} />
        <TodoCreate onSubmit={onSubmit} />
      </TodoLayout>
    </div>
  );
}

export default App;
