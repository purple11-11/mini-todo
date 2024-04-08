import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { create, done } from "../store/modules/Todo";
import { ReduxState } from "../types/interface";
import axios from "axios";

export default function TodoList() {
  const list = useSelector((state: ReduxState) => state.todo.list);
  //   console.log(list);
  const todoList = list.filter((li) => li.done === false);
  //   console.log(todoList);

  const dispatch = useDispatch();

  const todoRef = useRef<HTMLInputElement>(null);

  const nextID = useSelector((state: ReduxState) => state.todo.nextID);

  const createTodo = async () => {
    // dispatch({ type: "todo/CREATE", payload: { id: 3, text: todoRef.current.value } });
    if (nextID && todoRef.current) {
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_SERVER}/todo`,
        data: {
          text: todoRef.current.value,
        },
      });
      if (res.data) dispatch(create({ id: nextID, text: todoRef.current.value })); // 위의 dispatch와 같은 동작
      todoRef.current.value = "";
    }
  };
  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createTodo();
    }
  };

  const doneTodo = async (id: number) => {
    const res = await axios.patch(`${process.env.REACT_APP_API_SERVER}/todo/${id}`);
    if (res.data) dispatch(done(id));
  };
  return (
    <section className="TodoList">
      <div className="title">
        <h2>오늘의 할 일</h2>
        <div>
          <input type="text" placeholder="Todo" ref={todoRef} onKeyDown={activeEnter} />
          <button onClick={createTodo}>할 일 추가</button>
        </div>
      </div>
      <ul>
        {/* <li>
          <span>할 일1</span>
          <button>완료</button>
        </li> */}
        {todoList.map((todo) => {
          return (
            <li key={todo.id}>
              <span>{todo.text}</span>
              <button
                onClick={() => {
                  doneTodo(todo.id);
                }}
              >
                완료
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
