import { useEffect, useState } from "react";

function Timer({ dispatch }) {
  const [time, setTime] = useState(600); // 300 seconds = 5 minutes

  useEffect(() => {
    const countdown = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 1) {
          clearInterval(countdown); // Stop the timer when it reaches 0
          dispatch({ type: "finishedQuiz" }); // Dispatch the function when timer ends
        }
        return prevTime > 0 ? prevTime - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(countdown); // Cleanup the interval on component unmount
  }, [dispatch]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return <div className="timer">{formatTime(time)}</div>;
}

export default Timer;
