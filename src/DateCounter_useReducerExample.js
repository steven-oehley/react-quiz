import { useReducer } from "react";

function DateCounter() {
  // const [count, setCount] = useState(0);
  // using reducer instead
  const initialState = { count: 0, step: 1 };
  const reducer = (currentState, action) => {
    const { count, step } = currentState;
    switch (action.type) {
      case "inc":
        return { ...state, count: count + step }; //can do it this way if there are a lot of properties
      case "dec":
        return { count: count - step, step };
      case "setCount":
        return { count: action.payload, step };
      case "setStep":
        return { count, step: action.payload };
      case "reset":
        return initialState;
      default:
        throw new Error(
          "Invalid action type - types: inc, dec, setCount, setState, reset"
        );
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState); // reducer takes in a reducer and an initial state value
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    dispatch({ type: "dec" });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: +e.target.value });
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: +e.target.value });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="1"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
