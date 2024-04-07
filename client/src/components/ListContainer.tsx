import axios from "axios";
import DoneList from "./DoneList";
import TodoList from "./TodoList";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { init } from "../store/modules/Todo";

export default function ListContainer() {
  async function getTodoAll() {
    const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/todos`);
    if (res.data) dispatch(init(res.data));
  }
  const dispatch = useDispatch();

  useEffect(() => {
    getTodoAll();
  }, []);

  return (
    <div className="ListContainer">
      <TodoList />
      <DoneList />
    </div>
  );
}
