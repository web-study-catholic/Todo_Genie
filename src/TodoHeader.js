import styled from "styled-components";

const TodoHeaderStyle = styled.div`
  display: flex;
  flex-direction: column;

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
    font-size: 21px;
    color: #868e96;
    margin-top: 4px;
  }
  .todoInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }
  .todoLeft {
    color: #1e90ff;
    font-weight: bold;
    margin-top: 10px;
    font-size: 18px;
  }

  .deleteAll {
    background-color: #fd565f;
    color: white;
    border-radius: 5px;
    font-weight: bold;
    margin-top: 10px;
    cursor: pointer;
    border: none;
    font-size: 18px;
    font-family: "Nanum Pen Script";
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
  }
`;

function TodoHeader({ todos, onDeleteAll }) {
  const today = new Date();
  const now = today.toLocaleDateString({
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dayName = today.toLocaleDateString("ko-KR", { weekday: "long" });

  const undoneTasks = todos.filter((todo) => !todo.done);

  return (
    <>
      <TodoHeaderStyle>
        <h1>{now}</h1>
        <div className="day">{dayName}</div>
        <div className="todoInfo">
          <div className="todoLeft">할 일 {undoneTasks.length}개 남음</div>
          <div className="deleteAll" onClick={onDeleteAll}>
            Delete All
          </div>
        </div>
      </TodoHeaderStyle>
    </>
  );
}
export default TodoHeader;
