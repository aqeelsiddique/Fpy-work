import React, { useEffect, useState } from "react";
// import Mainpg from '../mainpg.jpg'
import { NavLink , useNavigate } from "react-router-dom";
import "./index.css";
// import options from './api/options';
import Img from "../mainimg.png";
import Mainbg from "../mainbg.png";
import options from "./api/options";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import teams from "./teams";
import TeamList from "./teams";
const Main = () => {
  const [teams, setTeams] = useState([]);
  const [round, setRound] = useState("Round_1");
  const [rounds, setrounds] = useState([]);
  // const [teams, setTeams] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  
  const [selectedRound, setSelectedRound] = useState("");
  useEffect(() => {
    async function fetchSubjects() {
      const response = await fetch("/rounds");
      const data = await response.json();
      setrounds(data);
    }
    fetchSubjects();
  }, []);


  /////update code 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/selecttecams?select_round=${round}`);
    const data = await response.json();
    setData(data);
    navigate('/teams', { data });
  }
  /////

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`/selecttecams?select_round=${round}`);
        const data = await response.json();
        setTeams(data.myData);


           // Pass the selected round results to the next page
    // navigate({
    //   pathname: '/teams',
    //   state: { selectedRoundResults: data.myData }
    // });

      } catch (error) {
        console.error(error);
      }
    };

    fetchTeams();
  }, [round]);

  const handleRoundChange = (event) => {
    setRound(event.target.value);
  };

  return (
    <>
      <div className="main2 container">
        <div
          className="main m-4 "
          style={{
            backgroundImage: `url(${Mainbg})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100%",
          }}
        >
          <div className="row">
            <div className="container main-set col-6">
              <h1 className="text">Visio Spark Quiz</h1>
              <Form.Group className="mb-4"   onSubmit={handleSubmit}>
                <Form.Label>Enter organizer name:</Form.Label>
                <Form.Control type="text" placeholder="Enter your full name" />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Select Round</Form.Label>
                <Form.Select onChange={handleRoundChange}>
                  {rounds.map((option) => (
                    <option key={option._id} value={option.roundname}>
                      {option.roundname}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Select Timer</Form.Label>
                <Form.Select>
                  <option value="30">30</option>
                  <option value="45">45</option>
                  <option value="60">60</option>
                </Form.Select>
              </Form.Group>
              <div className="d-grid gap-2 mt-3">
                <Button type="submit" className="btn btn">
                  <NavLink
                    to={
                      selectedRound ? `/teams?round=${selectedRound}` : "/teams"
                    }
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </NavLink>

                  {/* {teams.map((team) => (
                    <div key={team._id}>
                      <h2>{team.universityname}</h2>
                    </div>
                  ))} */}

                </Button>
              </div>
            </div>
            <div className="mainimg col-6">
              <img src={Img} alt="" />{" "}
            </div>
          </div>
        </div>
      </div>

   
    </>
  );
};

export default Main;







                      {/* Render team members here */}


   {/* {selectedRound && <TeamList />} */}

      {/* <TeamList round={selectedRound} /> */}

                  {/* {selectedRound && <TeamList round={selectedRound} />} */}
                  {/* <Form
                    action={
                      selectedRound
                        ? `/selectteams?round=${selectedRound}`
                        : "/teams"
                    }
                    method="get"
                  >
                    <div className="d-grid gap-2 mt-3">
                      <Button type="submit" className="btn btn-primary">
                        Submit
                      </Button>
                    </div>
                  </Form> */}
                  {/* <NavLink105
                    to="/teams"
                    style={{ color: "white", textDecoration: "none" }}
                  > */}

                  {/* <NavLink
                    to={
                      selectedRound
                        ? `/selectteams?round=${selectedRound}`
                        : "/teams"
                    }
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </NavLink> */}

                    // const handleRoundSelect = (event) => { 28
  //   setSelectedRound(event.target.value);
  // };

  // useEffect(() => {
  //   async function fetchTeams() {
  //     const url = selectedRound ? `/selecttecams?round=${selectedRound}` : '/selectteams';
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     setTeams(data);
  //   }
  //   fetchTeams();
  // },[selectedRound])