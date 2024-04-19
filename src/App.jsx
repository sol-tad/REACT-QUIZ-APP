import { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Main1 from "./Main1";
import { useReducer } from "react";

const initialState = {
  questions: [],
  status: "loading...",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
  case "dataFailed":
    return {...state,status:"error"}
      default: throw new Error("Action Unknown");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(function () {
    fetch("http://localhost:3000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({type:"dataFailed"}));
  }, []);
  return (
    <>
      <div className="app">
        <Header />

        <Main1>
          <p>1/15</p>
          <p>Question?</p>
        </Main1>
      </div>
    </>
  );
}

export default App;
