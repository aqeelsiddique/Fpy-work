import React from 'react'
import './index.css'
import { NavLink } from "react-router-dom";

import TeamMember from '../login2.png'

const teams = () => {
  return (
    <>
      <div className="teams" style={{
        backgroundImage: `linear-gradient(to bottom, rgba(150, 110, 250, 0.1), rgba(0, 19, 100, 0)), url(${TeamMember}) `,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        opacity: 1,
        height: '100vh',  
        width: '100%'
      }} >
        <div className="container">
          <div className="team-title">
            Round 1 Teams
            
          </div>
          <div className="team-member">
            <div className="team">
              <h1 className="heading">Team 1</h1>
              <div className="members">
                <p>Member 1</p>
                <p>Member 2</p>
                <p>Member 3</p>
                <p>Member 4</p>
              </div>
            </div>
            <div className="team">
              <h1 className="heading">Team 2</h1>
              <div className="members">
                <p>Member 1</p>
                <p>Member 2</p>
                <p>Member 3</p>
                <p>Member 4</p>
              </div>
            </div>
            <div className="team">
              <h1 className="heading">Team 3</h1>
              <div className="members">
                <p>Member 1</p>
                <p>Member 2</p>
                <p>Member 3</p>
                <p>Member 4</p>
              </div>
            </div>
            <div className="team">
              <h1 className="heading">Team 4</h1>
              <div className="members">
                <p>Member 1</p>
                <p>Member 2</p>
                <p>Member 3</p>
                <p>Member 4</p>
              </div>
            </div>
          </div>
          <button className='Color-White'> <NavLink to="/subject" style={{color:'white', textDecoration:'none'}} >Start</NavLink> </button>
        </div>
      </div>
    </>
  )
}

export default teams