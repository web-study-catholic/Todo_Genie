import styled from "styled-components";

const TodoHeaderStyle = styled.div`
  padding-top: 20px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    color: #343a40;
    font-size: 36px;
  }
  .day {
    font-size: 21x;
    color: #868e96;
    margin-top: 4px;
  }
  .todoLeft {
    color: #1e90ff;
    font-weight: bold;
    margin-top: 20px;
  }
`;

function TodoHeader() {
  const today = new Date();
  const now = today.toLocaleDateString({
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dayName = today.toLocaleDateString("ko-KR", { weekday: "long" });
  return (
    <>
      <TodoHeaderStyle>
        <h1>{now}</h1>
        <div className="day">{dayName}</div>
        {/* <div className="todoLeft">할 일 2개 남음</div> */}
      </TodoHeaderStyle>
    </>
  );
}
export default TodoHeader;
