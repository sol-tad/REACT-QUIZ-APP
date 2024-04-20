import { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Main1 from "./Main1";
import { useReducer } from "react";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./components/NextButton";

const initialState = {
  questions: [],
  status: "loading...",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };

    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1,answer:null };
    default:
      throw new Error("Action Unknown");
  }
}

function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions.length;
  useEffect(function () {
    fetch("http://localhost:3000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <>
      <div className="app">
        <Header />

        <Main1>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && (
            <StartScreen dispatch={dispatch} numQuestions={numQuestions} />
          )}
          {status === "active" && (
            <>
              <Question
                dispatch={dispatch}
                answer={answer}
                question={questions[index]}
              />
              <NextButton answer={answer} dispatch={dispatch} />
            </>
          )}
        </Main1>
      </div>
    </>
  );
}

export default App;
