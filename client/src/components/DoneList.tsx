import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../types/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { done, remove } from "../store/modules/Todo";

export default function DoneList() {
  const list = useSelector((state: ReduxState) => state.todo.list);
  const doneList = list.filter((li) => li.done === true);
  const dispatch = useDispatch();

  async function deleteTodo(id: number) {
    const res = await axios.delete(`${process.env.REACT_APP_API_SERVER}/todo/${id}`);
    if (res.data) dispatch(remove(id));
  }

  const replaceTodo = async (id: number) => {
    const res = await axios.patch(`${process.env.REACT_APP_API_SERVER}/todo/${id}`);
    if (res.data) dispatch(done(id));
  };

  return (
    <section className="DoneList">
      <h2>완료한 일</h2>
      {doneList.length === 0 ? (
        <p>아직 완료된 할 일이 없어용😥</p>
      ) : (
        <ul>
          {doneList.map((done) => {
            return (
              <li key={done.id}>
                <span>✔</span>
                <span className="done">{done.text}</span>
                <FontAwesomeIcon
                  style={{ margin: "0 15px" }}
                  icon={faRepeat}
                  onClick={() => replaceTodo(done.id)}
                />
                <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(done.id)} />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
