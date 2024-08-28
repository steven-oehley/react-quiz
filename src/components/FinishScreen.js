import { useQuestions } from "../context/QuestionContext";

function FinishScreen() {
  const { points, totalPoints, dispatch } = useQuestions();
  const percentage = (points / totalPoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <div className="flex flex-col items-center">
      <p className="result px-8 py-4 my-8">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {totalPoints} ({Math.ceil(percentage)}%)
      </p>
      {/* <p className="highscore">(Highscore: {highscore} points)</p> */}
      <button
        className="btn-css btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
    </div>
  );
}

export default FinishScreen;
