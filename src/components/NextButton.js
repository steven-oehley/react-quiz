import { useQuestions } from "../context/QuestionContext";

function NextButton() {
  const { dispatch, answer, questionIndex, numQuestions } = useQuestions();
  if (answer === null) {
    return null;
  }
  return (
    <>
      {questionIndex + 1 < numQuestions && (
        <button
          onClick={() => dispatch({ type: "nextQuestion" })}
          className="btn-css btn-ui"
        >
          Next
        </button>
      )}
      {questionIndex + 1 === numQuestions && (
        <button
          onClick={() => dispatch({ type: "finishedQuiz" })}
          className="btn-css btn-ui"
        >
          Finish
        </button>
      )}
    </>
  );
}
export default NextButton;
