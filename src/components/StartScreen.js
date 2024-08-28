import { useQuestions } from "../context/QuestionContext";

function StartScreen() {
  const { numQuestions, dispatch } = useQuestions();
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} questions to test your React knowledge</h3>
      <button
        onClick={() => dispatch({ type: "startQuiz" })}
        className="btn btn-outline btn-info btn-lg  text-2xl hover:text-white"
      >
        Let's Start
      </button>
    </div>
  );
}
export default StartScreen;
