import { TodoList, TodoState } from "../../types/interface";

// const initialValue = {
const initialState: TodoState = {
  list: [
    // {
    //   id: 0,
    //   text: "리액트 공부하기",
    //   done: false,
    // },
  ],
  //   nextID: 3, // 여기에 nextID가 추가됨
};

const INIT = "todo/INIT" as const;
const CREATE = "todo/CREATE" as const;
const DONE = "todo/DONE" as const;

let count = initialState.list.length;
initialState["nextID"] = count; // 할 일 추가 시 다음 id 부여하기 위해 미리 계산

// action 함수
export const init = (data: TodoList[]) => ({
  type: INIT,
  data, //object {id, text, done}
});
export const create = (payload: { id: number; text: string }) => ({
  type: CREATE,
  payload, // object 형태로 받을 것임 {id, text}
});
export const done = (id: number) => ({
  type: DONE,
  id, // number
});

interface Init {
  type: typeof INIT;
  data: TodoList[];
}

interface Create {
  type: typeof CREATE;
  payload: { id: number; text: string };
}

interface Done {
  type: typeof DONE;
  id: number;
}

type Action = Init | Create | Done;

// export function TodoReducer(state = initialValue, action) {
export function TodoReducer(state = initialState, action: Action) {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        list: action.data,
        nextID: action.data.length === 0 ? 1 : action.data[action.data.length - 1].id + 1,
      };
    case CREATE:
      if (action.payload.text.trim() === "") return state;

      // 할 일 추가
      return {
        ...state,
        list: state.list.concat({
          id: action.payload.id,
          text: action.payload.text,
          done: false,
        }),
        nextID: action.payload.id + 1,
      };
    case DONE:
      return {
        ...state,
        list: state.list.map((li) => {
          if (li.id === action.id) {
            return {
              ...li, // id와 text는 그대로 유지
              done: true,
            };
          } else {
            return li;
          }
        }),
      };
    default:
      return state;
  }
}
