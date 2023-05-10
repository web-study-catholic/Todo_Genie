import "./App.css";
import TodoHeader from "./TodoHeader";
import TodoLayout from "./TodoLayout";
import { createGlobalStyle } from "styled-components";
import TodoCreate from "./TodoCreate";
import TodoList from "./TodoList";
import { useRef, useState, useCallback, useEffect } from "react";

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  const dataId = useRef(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("todo"));

    if (localData && localData.length > 0) {
      const todoList = localData.sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      if (todoList.length >= 1) {
        dataId.current = parseInt(todoList[0].id + 1);
      }

      setData(todoList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(data));
    console.log(data);
  }, [data]);

  const onSubmit = useCallback((newTodo) => {
    const newData = {
      id: dataId.current,
      text: newTodo,
      done: false,
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

  const onEdit = useCallback(
    (targetId, newContent) => {
      setData(
        data.map((it) =>
          it.id === targetId ? { ...it, text: newContent } : it
        )
      );
    },
    [data]
  );

  const onDeleteAll = useCallback(() => {
    setData([]);
    dataId.current = 0;
    localStorage.removeItem("todo");
  }, []);

  return (
    <div className="App">
      <GlobalStyle />

      <TodoLayout>
        <TodoHeader todos={data} onDeleteAll={onDeleteAll} />
        <TodoList
          onEdit={onEdit}
          onRemove={onRemove}
          todolist={data}
          onToggle={onToggle}
        />
        <TodoCreate onSubmit={onSubmit} />
      </TodoLayout>
    </div>
  );
}

export default App;
