import React from "react";
import styled, { css } from "styled-components";
import { MdDone, MdDelete } from "react-icons/md";

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const TodoItemStyle = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover{
    ${Remove} {
        display:initial;
    }
  }

  }
`;
const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  background-color: ${({ done }) => (done ? "#38d9a9" : "transparent")};
  color: ${({ done }) => (done ? "#fff" : "inherit")};
`;
const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

function TodoItem({ done, text, onRemove, onToggle, id }) {
  const handleRemove = () => {
    onRemove(id);
  };
  const handleToggle = () => {
    onToggle(id);
  };
  return (
    <TodoItemStyle>
      <CheckCircle done={done} onClick={handleToggle}>
        {done && <MdDone />}
      </CheckCircle>
      <Text done={done} onClick={handleToggle}>
        {text}
      </Text>
      <Remove onClick={handleRemove}>
        <MdDelete />
      </Remove>
    </TodoItemStyle>
  );
}
export default TodoItem;
