import React from 'react'
import './index.css'
import { NavLink } from "react-router-dom";

import TeamMember from '../login2.png'

const Teams = () => {
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
      <div class="container">
  <div class="row">
  <div className="team-title">
            Round 1 Teams

          </div>
    <div className="col-md-4">
      <div className="card">
        <div className="card-body">
          <h2 className='uni-name'>Comsats Wah</h2>
          <h3 className="team">Team 1</h3>
          <button type="button" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div className="members">
                <p>Member 1</p>
                <p>Member 2</p>
                <p>Member 3</p>
              </div>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="card">
        <div className="card-body">
          <h2 className='uni-name'>Comsats Wah</h2>
          <h3 className="team">Team 2</h3>
          <button type="button" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div className="members">
                <p>Member 1</p>
                <p>Member 2</p>
                <p>Member 3</p>
              </div>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="card">
        <div className="card-body">
          <h2 className='uni-name'>University of Wah cantt</h2>
          <h3 className="team">Team 3</h3>
          <button type="button" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div className="members">
                <p>Member 1</p>
                <p>Member 2</p>
                <p>Member 3</p>
              </div>
        </div>
      </div>
    </div>
    <div className="card-submit">
    <button className='Color-White'> <NavLink to="/main2" style={{ color: 'white', textDecoration: 'none' }} >Cancel</NavLink> </button>
          <button className='Color-White'> <NavLink to="/subject" style={{ color: 'white', textDecoration: 'none' }} >Start</NavLink> </button>
          </div>
  </div>
</div>

          </div>
         
    </>
  )
}

export default Teams;