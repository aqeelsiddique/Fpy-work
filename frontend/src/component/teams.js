import './index.css'
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import teamMemberImage from '../login2.png';
import TeamMember from '../login2.png'
const TeamList = ({ round }) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function fetchTeams() {
      const url = round ? `/selectteams?round=${round}` : '/selectteams';
      const response = await fetch(url);
      const data = await response.json();
      setTeams(data);
    }
    fetchTeams();
  }, [round]);

  return (
    <>
      <div
        className="teams"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(150, 110, 250, 0.1), rgba(0, 19, 100, 0)), url(${teamMemberImage}) `,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          opacity: 1,
          height: '100vh',
          width: '100%'
        }}
      >
        <div className="container">
          <div className="team-title">Round 1 Teams</div>
          <div className="team-member">
            {teams.map((team) => (
              <div key={team._id}>
                
                <h2>{team.teamname}</h2>
                {/* <ul>
                  {team.members.map((member) => (
                    <li key={member._id}>{member.name}</li>
                  ))}
                </ul> */}
              </div>
            ))}
          </div>
          <button className="Color-White">
            <NavLink to="/subject" style={{ color: 'white', textDecoration: 'none' }}>
              Start
            </NavLink>
          </button>
        </div>
      </div>
    </>
  );
};

export default TeamList;