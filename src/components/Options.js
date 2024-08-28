import { useQuestions } from "../context/QuestionContext";

function Options() {
  const { questions, questionIndex, dispatch, answer } = useQuestions();
  const options = questions[questionIndex].options;
  const correctOption = questions[questionIndex].correctOption;

  const hasAnswer = answer !== null;

  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          onClick={() =>
            dispatch({
              type: "newAnswer",
              payload: index,
            })
          }
          disabled={hasAnswer}
          className={`btn-css btn-option-css ${
            index === answer ? "answer" : ""
          } ${hasAnswer && index === correctOption ? "correct" : "wrong"}`}
          key={index + "_" + option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
export default Options;
