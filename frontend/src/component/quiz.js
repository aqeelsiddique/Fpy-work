import React, { useState, useEffect, useCallback } from 'react'
import SelectQuiz from '../sub.png'
import './index.css'
import quizData from './api/quizData'

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);

    const handleAnswerClick = useCallback((answer) => {
        if (answer === quizData[currentQuestion].answer) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < quizData.length) {
            setCurrentQuestion(nextQuestion);
            setTimeLeft(10);
        } else {
            setShowScore(true);
        }
    }, [currentQuestion, score]);

    useEffect(() => {
        if (timeLeft === 0) {
            handleAnswerClick("");
        }
        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeLeft, handleAnswerClick]);

    useEffect(() => {
        setTimeLeft(30);
    }, [currentQuestion]);

    return (
        <div className="quiz">
            {showScore ? (
                <div className="score-section">
                    You scored {score} out of {quizData.length}
                </div>
            ) : (
                <>
                    <div className="quiz" style={{
                        backgroundImage: `url(${SelectQuiz})`,
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        width: '100%',
                        height: '100vh'
                    }} >
                        <div className="container">
                            <div className="quiz-team-detail">
                                <div className="row">
                                    <div className="col-lg-4 "><h2 className='name'>Team 1</h2></div>
                                    <div className="col-lg-4 "><h2 className='round'>Database</h2></div>
                                    <div className="col-lg-4   timer"><h1 className='circle'>{timeLeft}</h1></div>
                                </div>
                            </div>
                            <div className="quiz-content">
                                <div className="question-count">
                                    Question {currentQuestion + 1}/{quizData.length}
                                </div>
                                <div className="question">
                                    <h2>{quizData[currentQuestion].question}</h2>
                                </div>
                                <div className="options">
                                    <ol type='a' >
                                            {/* <input type="radio"
                                                value={true} name="options" id='q1-option' onChange={onSelect()} /> */}
                                        <li>{quizData[currentQuestion].options.map((option) => (
                                            <button width='100%' className='text-primary ' key={option} onClick={() => handleAnswerClick(option)} htmlFor="q1-option"><h4>{option}</h4></button>
                                            ))} 
                                            {/* <div className="check Checked"></div> */}
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )};
        </div>
    )
}

export default Quiz;
