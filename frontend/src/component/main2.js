import React, { useEffect, useState } from "react";

// import Mainpg from '../mainpg.jpg'
import { NavLink } from "react-router-dom";
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
  const [rounds, setrounds] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedRound, setSelectedRound] = useState("");

  useEffect(() => {
    async function fetchSubjects() {
      const response = await fetch("/rounds");
      const data = await response.json();
      setrounds(data);
    }
    fetchSubjects();
  }, []);

  const handleRoundSelect = (event) => {
    setSelectedRound(event.target.value);
  };

  useEffect(() => {
    async function fetchTeams() {
      const url = selectedRound ? `/selectteams?round=${selectedRound}` : '/selectteams';
      const response = await fetch(url);
      const data = await response.json();
      setTeams(data);
    }
    fetchTeams();
  },[selectedRound])

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
            // height: '100%'
          }}
        >
          <div className="row">
            <div className="container main-set col-6">
              <h1 className="text">Visio Spark Quiz</h1>
              {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p> */}

              <Form.Group className="mb-4">
                <Form.Label>Enter organizer name:</Form.Label>
                <Form.Control type="text" placeholder="Enter your full name" />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Select Round</Form.Label>
                <Form.Select onChange={handleRoundSelect}>
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
                  {/* <NavLink
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
                  <NavLink
                    to={
                      selectedRound
                        ? `/selectteams?round=${selectedRound}`
                        : "/teams"
                    }
                    style={{ color: "white", textDecoration: "none" }}
                  ><button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </NavLink>

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
                </Button>
              </div>
            </div>
            <div className="mainimg col-6">
              <img src={Img} alt="" />{" "}
            </div>
          </div>
        </div>
      </div>

      {/* {selectedRound && <TeamList />} */}

      {/* <TeamList round={selectedRound} /> */}
    </>
  );
};

export default Main;
