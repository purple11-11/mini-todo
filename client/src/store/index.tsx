import { combineReducers } from "redux";
import { TodoReducer } from "./modules/Todo";

export default combineReducers({
  todo: TodoReducer,
});
