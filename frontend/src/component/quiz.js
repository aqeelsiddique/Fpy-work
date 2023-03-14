import React from 'react'
import SelectQuiz from '../sub.png'
import './index.css'

const quiz = (props) => {
    return (
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
                            <div className="col-lg-4   timer"><h1 className='circle'>60</h1></div>
                        </div>
                    </div>
                    <div className="quiz-content">
                        <div className="question">
                            Which of the following is not a type of database?</div>

                        <div className="options">
                            <p>a. Hierarchical</p>
                            <p>b. Network</p>
                            <p>c. Distributed</p>
                            <p>d. Decentralized</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default quiz
