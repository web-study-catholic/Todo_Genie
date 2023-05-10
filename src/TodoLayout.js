import React from "react";
import styled from "styled-components";
const TodoLayoutStyle = styled.div`
  width: 512px;
  height: 768px;

  background: white;
  border-radius: 16px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin: 0 auto;
  padding: 5px;
  margin-top: 100px;
  padding-top: 20px;
  position: relative;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
`;
function TodoLayout({ children }) {
  return <TodoLayoutStyle>{children}</TodoLayoutStyle>;
}
export default TodoLayout;
