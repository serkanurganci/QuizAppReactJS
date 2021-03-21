const Questionaire = ({
  handleNextQuestion,
  handleAnswer,
  showAnswers,
  data: { question, correct_answer, answers },
}) => {
  return (
    <div className="flex flex-col">
      <div className="bg-white text-yellow-800 p-10 rounded-lg shadow-xl">
        <h2
          className="text-2xl"
          dangerouslySetInnerHTML={{ __html: question }}
        ></h2>
      </div>
      <div className=" grid grid-cols-2 gap-6 mt-6">
        {answers.map((answer, index) => {
          const bgColor = showAnswers
            ? answer === correct_answer
              ? "bg-green-500"
              : "bg-red-500"
            : "bg-white";

          const textColor = showAnswers ? "text-white" : "text-yellow-800";
          return (
            <button
              key={index}
              onClick={() => handleAnswer(answer)}
              className={`${bgColor} ${textColor}   p-4  font-bold`}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          );
        })}
      </div>
      {showAnswers && (
        <button
          onClick={() => handleNextQuestion()}
          className={`mt-6 ml-auto bg-purple-700 p-4  font-semibold text-white`}
        >
          Next Questions
        </button>
      )}
    </div>
  );
};

export default Questionaire;
