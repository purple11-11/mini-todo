export interface TodoList {
  id: number;
  text: string;
  done: boolean;
}

export interface TodoState {
  list: TodoList[];
  nextID?: number;
}

export interface ReduxState {
  todo: TodoState;
}
