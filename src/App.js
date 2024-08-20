import { useEffect, useReducer } from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";

// declare outside as never need to change with renders

const initalState = {
  questions: [],
  appStatus: "loading", // status of application - loading, error, ready, active, finished};
  questionIndex: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "dataRecieved":
      return { ...state, questions: payload, appStatus: "ready" };
    case "dataFailed":
      return { ...state, appStatus: "error" };
    case "startQuiz":
      return { ...state, appStatus: "active" };
    case "newAnswer":
      const question = state.questions[state.questionIndex];
      const { correctOption, points } = question;
      const isCorrect = correctOption === payload;
      return {
        ...state,
        answer: payload,
        points: isCorrect ? state.points + points : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        questionIndex: state.questionIndex + 1,
        answer: null,
      };
    case "finishedQuiz":
      return {
        ...state,
        appStatus: "finished",
      };
    case "restart":
      return {
        ...initalState,
        appStatus: "ready",
        questions: state.questions, // Preserve questions
      };
    default:
      throw new Error(
        "Dispatch action unknown, must be one of - loading, error, ready, active, finished"
      );
  }
}

function App() {
  const [{ questions, appStatus, questionIndex, answer, points }, dispatch] =
    useReducer(reducer, initalState);

  const totalPoints = questions.reduce(
    (sum, question) => sum + question.points,
    0
  );

  const numQuestions = questions.length;

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch("http://localhost:3001/questions");
        const data = await response.json();
        dispatch({ type: "dataRecieved", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }

    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {appStatus === "loading" && <Loader />}
        {appStatus === "error" && <Error />}
        {appStatus === "ready" && (
          <StartScreen dispatch={dispatch} numQuestions={questions.length} />
        )}
        {appStatus === "active" && questionIndex < numQuestions && (
          <>
            <Progress
              index={questionIndex}
              numQuestions={questions.length}
              totalPoints={totalPoints}
              points={points}
            />
            <div className="w-2/3 mx-auto mt-16">
              <Question
                question={questions[questionIndex]}
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                questionIndex={questionIndex}
              />
            </div>
            <Footer
              dispatch={dispatch}
              answer={answer}
              numQuestions={numQuestions}
              questionIndex={questionIndex}
            />
          </>
        )}
        {appStatus === "finished" && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
export default App;
