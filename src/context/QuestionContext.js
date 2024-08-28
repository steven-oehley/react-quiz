import { createContext, useContext, useReducer } from "react";

const initalState = {
  questions: [],
  appStatus: "loading", // status of application - loading, error, ready, active, finished};
  questionIndex: 0,
  answer: null,
  points: 0,
  question: null,
  options: [],
  correctOption: null,
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

const QuestionContext = createContext();

const QuestionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initalState);
  const { questions, appStatus, questionIndex, answer, points } = state;
  const totalPoints = questions.reduce(
    (sum, question) => sum + question.points,
    0
  );

  const numQuestions = questions.length;
  return (
    <QuestionContext.Provider
      value={{
        questions,
        appStatus,
        questionIndex,
        answer,
        points,
        totalPoints,
        numQuestions,
        dispatch,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

const useQuestions = () => {
  const context = useContext(QuestionContext);
  if (context === undefined)
    throw new Error("QuestionContext used outside of QuestionProivder");
  return context;
};

export { useQuestions, QuestionProvider };
