import Options from "./Options";

function Question({ question, dispatch, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        options={question.options}
        correctOption={question.correctOption}
        dispatch={dispatch}
        answer={answer}
        points={question.points}
      />
    </div>
  );
}

export default Question;
