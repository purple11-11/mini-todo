import ListContainer from "./components/ListContainer";
import "./styles/style.scss";

function App() {
  console.log(process.env.REACT_APP_MODE);

  return (
    <div className="App">
      <main>
        <h1>TodoList</h1>
        <ListContainer />
      </main>
    </div>
  );
}

export default App;
