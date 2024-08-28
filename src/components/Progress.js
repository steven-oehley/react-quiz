import { useQuestions } from "../context/QuestionContext";

function Progress() {
  const { questionIndex, numQuestions, points, totalPoints } = useQuestions();
  return (
    <header>
      <div className="flex items-center justify-center gap-4">
        <progress
          className="progress progress-info w-2/3 h-6 "
          value={points}
          max="480"
        ></progress>
        <p className="text-2xl">
          <strong>{points}</strong>/{totalPoints} points
        </p>
      </div>
      <div className="overflow-x-auto w-full">
        <ul className="steps">
          {Array.from({ length: numQuestions }, (_, i) => (
            <li
              key={i}
              className={`text-xl step ${
                i <= questionIndex ? "step-info" : ""
              }`}
            ></li>
          ))}
        </ul>
      </div>
    </header>
  );
}
export default Progress;
