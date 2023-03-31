import React, { useEffect, useState } from 'react'

import SelectQuiz from '../sub.png'
import './index.css'

const Quiz = (props) => {
const [questions, setQuestions] = useState([])
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
const [score, setScore] = useState(0)
useEffect(() => {
async function fetchQuestions() {
const response = await fetch('/questions')
const data = await response.json()
setQuestions(data)
}
fetchQuestions()
}, [])

if (questions.length === 0) {
return <div>Loading...</div>
}

const currentQuestion = questions[currentQuestionIndex]

const handleOptionSelect = (selectedOption) => {
if (selectedOption === currentQuestion.correctOption) {
setScore(score + 1)
}
}

const handleNextQuestion = () => {
setCurrentQuestionIndex(currentQuestionIndex + 1)
}

return (
<>
<div
        className="quiz"
        style={{
          backgroundImage: `url(${SelectQuiz})`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100vh",
        }}
      >
<div className="container">
<div className="quiz-team-detail">
<div className="row">
<div className="col-lg-4 ">
<h2 className="name">Team 1</h2>
</div>
<div className="col-lg-4 ">
<h2 className="round">Database</h2>
</div>
<div className="col-lg-4   timer">
<h1 className="circle">60</h1>
</div>
</div>
</div>
<div className="quiz-content">
<div className="question" key={currentQuestion._id}>
{currentQuestion.ques}
</div>
<div className="options" key={currentQuestion._id}>
<p onClick={() => handleOptionSelect(currentQuestion.option1)}>{currentQuestion.option1}</p>
<p onClick={() => handleOptionSelect(currentQuestion.option2)}>{currentQuestion.option2}</p>
<p onClick={() => handleOptionSelect(currentQuestion.option3)}>{currentQuestion.option3}</p>
<p onClick={() => handleOptionSelect(currentQuestion.option4)}>{currentQuestion.option4}</p>
</div>
</div>
<button
disabled={currentQuestionIndex === questions.length - 1}
onClick={handleNextQuestion}
>
Next Question
</button>
{currentQuestionIndex === questions.length - 1 && (
<div>Your final score is: {score}</div>
)}
</div>
</div>
</>
)
}

export default Quiz