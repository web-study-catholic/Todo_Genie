import React from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";

const TodoListStyle = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;
function TodoList({ onRemove, todolist, onToggle }) {
  return (
    <TodoListStyle>
      {todolist.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          done={item.done}
          text={item.text}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </TodoListStyle>
  );
}

export default TodoList;
