import { useEffect } from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import { useQuestions } from "./context/QuestionContext";

// declare outside as never need to change with renders

function App() {
  const { appStatus, questionIndex, numQuestions, dispatch } = useQuestions();

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
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <Main>
        {appStatus === "loading" && <Loader />}
        {appStatus === "error" && <Error />}
        {appStatus === "ready" && <StartScreen />}
        {appStatus === "active" && questionIndex < numQuestions && (
          <>
            <Progress />
            <div className="w-2/3 mx-auto mt-16">
              <Question />
            </div>
            <Footer />
          </>
        )}
        {appStatus === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}
export default App;
