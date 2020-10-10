import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";
import ProgressBar from "./components/ProgressBar";
import Hello from './components/Hello.jsx';
import axios from "axios"

function App() {
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [currentProblem, setCurrentProblem] = useState(generateProblem());
  const [userAnswer, setUserAnswer] = useState("");
  const [showError, setShowError] = useState(false);
  const answerField = useRef(null);
  const resetButton = useRef(null);

  useEffect(() => {
    if (score == 10 || mistakes == 3) {
      setTimeout(() => resetButton.current.focus(), 331);
    }
  }, [score, mistakes]);

  function generateNumber(max) {
    return Math.floor(Math.random() * (max + 1));
  }

  function generateProblem() {
    return {
      numberOne: generateNumber(10),
      numberTwo: generateNumber(10),
      operator: ["+", "-", "x"][generateNumber(2)],
    };
  }

  function handleSubmit(e) {
    e.preventDefault();

    answerField.current.focus();

    let correctAnswer;
    if (currentProblem.operator == "+")
      correctAnswer = currentProblem.numberOne + currentProblem.numberTwo;
    if (currentProblem.operator == "-")
      correctAnswer = currentProblem.numberOne - currentProblem.numberTwo;
    if (currentProblem.operator == "x")
      correctAnswer = currentProblem.numberOne * currentProblem.numberTwo;

    if (correctAnswer == parseInt(userAnswer, 10)) {
      setScore((prev) => prev + 1);
      setCurrentProblem(generateProblem());
      setUserAnswer("");
    } else {
      setMistakes((prev) => prev + 1);
      setShowError(true);
      setTimeout(() => setShowError(false), 401);
    }
  }

  function resetGame() {
    setScore(0);
    setMistakes(0);
    setUserAnswer("");
    setCurrentProblem(generateProblem());
    answerField.current.focus();
  }

  async function triple() {
    const a = await axios.get( "https://jsonplaceholder.typicode.com/posts");
    console.log(a);
  }
  triple();

  return (
      <>
    
      <div
        className={"main-ui" + (mistakes == 3 || score == 10 ? " blurred" : "")}
      >
        <p className={"problem" + (showError ? " animate-wrong" : "")}>
          {currentProblem.numberOne} {currentProblem.operator}{" "}
          {currentProblem.numberTwo}
        </p>

        <form onSubmit={handleSubmit} action="" className="our-form">
          <input
            ref={answerField}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            type="text"
            className="our-field"
            autoComplete="off"
          />
          <button>Submit</button>
        </form>

        <p className="status">
          You need {10 - score} more points, and are allowed to make{" "}
          {2 - mistakes} more mistakes.
        </p>

        <ProgressBar score={score} />
      </div>

      <div
        className={
          "overlay" + (mistakes == 3 || score == 10 ? " overlay--visible" : "")
        }
      >
        <div className="overlay-inner">
          <p className="end-message">
            {score == 10 ? "Congrats! You won." : "Sorry! You lost."}
          </p>
          <button
            ref={resetButton}
            onClick={resetGame}
            className="reset-button"
          >
            Start Over
          </button>
        </div>
      </div>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
ReactDOM.render(<Hello />, document.getElementById('hello'))
// 在開發模式中，更新js不會重新載入頁面，這提升我們開發的效能
// 將總是馬code注入在記憶體而已
// 比如說在頁面上把文字框起來，而改變.js檔，而可以動態更新.js檔，而不會重新載入頁面
// 這對於停留在當前的web state很有幫助，不會亂跑掉
if (module.hot) {
  module.hot.accept();
}
