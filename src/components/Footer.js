import NextButton from "./NextButton";
import Timer from "./Timer";

function Footer({ dispatch, answer, numQuestions, questionIndex }) {
  return (
    <footer>
      <Timer dispatch={dispatch} />
      <NextButton
        dispatch={dispatch}
        answer={answer}
        numQuestions={numQuestions}
        questionIndex={questionIndex}
      />
    </footer>
  );
}
export default Footer;
