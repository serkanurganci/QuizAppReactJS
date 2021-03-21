import { useState, useEffect } from "react";
import { Questionaire } from "./components";

const API_URL = `https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple`;

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const questions = data.results.map((question) => ({
          ...question,
          answers: [
            question.correct_answer,
            ...question.incorrect_answers,
          ].sort(() => Math.random() - 0.5),
        }));
        setQuestions(questions);
      });
  }, []);

  const handleAnswer = (answer) => {
    // check for the answer
    if (!showAnswers) {
      if (answer === questions[currentIndex].correct_answer) {
        setScore(score + 1);
      }
    }

    setShowAnswers(true);
  };

  const handleNextQuestion = () => {
    setCurrentIndex(currentIndex + 1);
    setShowAnswers(false);
  };

  return questions.length > 0 ? (
    currentIndex >= questions.length ? (
      <h1 className="text-3xl text-white font-bold border-4 p-4 border-double rounded-lg animate__animated animate__heartBeat">
        Game Ended! Your score is: {score}
      </h1>
    ) : (
      <div className="container">
        <Questionaire
          data={questions[currentIndex]}
          showAnswers={showAnswers}
          handleAnswer={handleAnswer}
          handleNextQuestion={handleNextQuestion}
        />
      </div>
    )
  ) : (
    <h1 className="text-2xl text-white font-bold ">Loading...</h1>
  );
}

export default App;
