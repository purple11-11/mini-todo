import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const store = configureStore({ reducer: rootReducer });

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
