import { useSelector } from "react-redux";
import { ReduxState } from "../types/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function DoneList() {
  const list = useSelector((state: ReduxState) => state.todo.list);
  const doneList = list.filter((li) => li.done === true);
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
                <FontAwesomeIcon icon={faTrash} />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
