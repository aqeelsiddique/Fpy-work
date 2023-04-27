import "./index.css";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import teamMemberImage from "../login2.png";
import TeamMember from "../login2.png";
import { useLocation } from 'react-router-dom';

const TeamList = ({ round }) => {
  const [data, setData] = useState([]);

  const [teams, setTeams] = useState([]);
  useEffect(() => {
    async function fetchTeams() {
      try {
        const url = round ? `/selecttecams?select_round=${round}` : "/selectteams";
        const response = await fetch(url);
        const data = await response.json();
        console.log("Fetched data:", data);
        setTeams(data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    }
    fetchTeams();
  }, [round]);

  console.log("Teams:", teams);
  const location = useLocation();
  const selectedRoundResults = location.state.selectedRoundResults;
  if (!selectedRoundResults) {
    return <div>Loading...</div>; // return a loading message if the data hasn't been loaded yet
  }

  return (
    <>
      <div
        className="teams"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(150, 110, 250, 0.1), rgba(0, 19, 100, 0)), url(${teamMemberImage}) `,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          opacity: 1,
          height: "100vh",
          width: "100%",
        }}
      >
        <div className="container">
          <div className="team-title">Round 1 Teams</div>
          <div className="team-member">
            <ul>
              
            </ul>
            {teams.map((team) => (
              <div key={team._id}>
                <h2>{team.universityname}</h2>
                {/* <ul>
                  {team.member2.map((member) => (
                    <li key={member._id}>{member.name}</li>
                  ))}
                </ul> */}
              </div>
            ))}
          </div>
          <button className="Color-White">
            <NavLink
              to="/subject"
              style={{ color: "white", textDecoration: "none" }}
            >
            Start
            </NavLink>
          </button>
        
        </div>
      </div>
      <div>
      {selectedRoundResults.map(team => (
        <div key={team._id}>
          <h2>{team.universityname}</h2>
        </div>
      ))}
    </div>

    </>
  );
};

export default TeamList;
