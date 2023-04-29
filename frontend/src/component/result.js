import React from 'react';
import './index.css'
import SelectQuiz from '../sub.png'
// import { NavLink } from "react-router-dom";

const Result = () => {

  return (
    <div className="result">
      <div className="quiz" style={{
        backgroundImage: `url(${SelectQuiz})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100vh'
      }} >
        <div className="round-detail">
          <div className="round">
            <h1><span>Result</span> Round : 1  </h1>
          </div>
        </div>
        <div className="container">
          <div className="flex-content">
            <div className="second">
              <h1>Second Position</h1>
              <h2>IUB University</h2>
              <h2>Score : 0</h2>
            </div>
            <div className="winner">
              <h1>Winner</h1>
              <h2>PUCIT University</h2>
              <h2>Score : 10</h2>
            </div>
            <div className="third">
              <h1>Third Position</h1>
              <h2>Cui Wah</h2>
              <h2>Score : 0</h2>
            </div>
          </div>
          {/* <div className="card-submit">
            <button className='Color-White'> <NavLink to="/main2" style={{ color: 'white', textDecoration: 'none' }} >Cancel</NavLink> </button>
          </div> */}
                  </div>
      </div>
    </div>
  );
};

export default Result;
