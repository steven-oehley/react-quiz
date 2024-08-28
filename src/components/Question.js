import { useQuestions } from "../context/QuestionContext";
import Options from "./Options";

function Question() {
  const { questions, questionIndex } = useQuestions();
  const question = questions[questionIndex];
  return (
    <div>
      <h4>{question.question}</h4>
      <Options />
    </div>
  );
}

export default Question;
