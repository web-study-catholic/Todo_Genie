import React, { useState, useRef, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import { MdDone, MdDelete, MdEdit } from "react-icons/md";

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

const Edit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  padding-right: 20px;
  &:hover {
    color: #4b89dc;
  }
  display: none;
`;
const TodoItemStyle = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;

  &:hover {
    ${Edit} ,${Remove} {
      display: ${(props) => (props.isEdit ? "none" : "initial")};
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
  position: relative;
  padding: 0;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
    `}
  textarea {
    max-height: 20px;
    width: 100%;
    border: none;
    font-size: 21px;
    background: none;
    resize: none;
    outline: none;
    color: inherit;
    padding: -;
    margin: 0;
    overflow: hidden;
    min-height: 21px;
    border-bottom: 1px solid #ced4da;

    ${(props) =>
      props.done &&
      css`
        color: #ced4da;
      `}

    &:focus {
      border-bottom: 2px solid #38d9a9;
    }
  }
`;

function TodoItem({ onEdit, done, text, onRemove, onToggle, id }) {
  const handleRemove = () => {
    onRemove(id);
  };
  const handleToggle = () => {
    onToggle(id);
  };

  const [isEdit, setIsEdit] = useState(false);
  const [localContent, setLocalContent] = useState(text);
  const editInputRef = useRef(-1);

  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };
  const handleQuitEdit = useCallback(() => {
    setIsEdit(false);
    setLocalContent(text);
  }, [text]);

  const handleEdit = () => {
    editInputRef.current.focus();
    onEdit(id, localContent);
  };

  useEffect(() => {
    if (isEdit) {
      editInputRef.current.focus();
    }
  }, [isEdit]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!editInputRef.current?.contains(event.target)) {
        handleQuitEdit();
      }
    };

    if (isEdit) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isEdit, handleQuitEdit]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (localContent.length < 5) {
        alert("5글자 이상 입력하세요");
        editInputRef.current.focus(); // 수정: 인자 없이 focus() 호출
        return;
      }

      setIsEdit(false);
      handleEdit();
    }
  };
  return (
    <TodoItemStyle>
      <CheckCircle done={done} onClick={handleToggle}>
        {done && <MdDone />}
      </CheckCircle>
      <Text done={done}>
        {isEdit ? (
          <>
            <textarea
              ref={editInputRef}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </>
        ) : (
          <>{text}</>
        )}
      </Text>
      <Edit onClick={toggleIsEdit}>
        <MdEdit />
      </Edit>
      <Remove onClick={handleRemove}>
        <MdDelete />
      </Remove>
    </TodoItemStyle>
  );
}
export default TodoItem;
