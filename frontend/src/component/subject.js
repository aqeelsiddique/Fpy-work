import React , {useEffect, useState} from 'react'
import Sub from '../sub.png'
import { NavLink } from "react-router-dom"
import './index.css'
import axios from "axios";

const Subject = () => {
  return (
    
    <>
      <div>
            <h1>Data:</h1>
            {/* <ul>
                {data.map(item => (
                    <li key={item._id}>{item.title}</li>
                ))}
            </ul> */}
        </div>
      <div className="subject" style={{
        backgroundImage: `url(${Sub})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100vh'
      }} >
        <div className="container">
          <div className="round">
            <h1>Quiz <span> Round 1 </span></h1>
          </div>
          <div className="sub">

            <div className="sub-title text-center text-white">
              <h2>Select Subject</h2>
            </div>

            <div className="sub-content">
              {/* {
                data && data.map((item, index) => {
                  return(
                  < tr key= {index}>
                    <td>ddd{item.name}</td>
                  </ tr>
                  )
                })
              } */}
              <p className="subj"><NavLink to="/quiz">Database</NavLink></p>
              <p className="subj"><NavLink to="/quiz">Data Science</NavLink></p>
              <p className="subj"><NavLink to="/quiz">Mathematics</NavLink></p>
              <p className="subj"><NavLink to="/quiz">English</NavLink></p>
              <p className="subj"><NavLink to="/quiz">Physics</NavLink></p>
              <p className="subj"><NavLink to="/quiz">AI</NavLink></p>
              <p className="subj"><NavLink to="/quiz">Database</NavLink></p>
              <p className="subj"><NavLink to="/quiz">Management</NavLink></p>
              <p className="subj"><NavLink to="/quiz">Object oriented</NavLink></p>
              <p className="subj"><NavLink to="/quiz">Software</NavLink></p>
              <p className="subj"><NavLink to="/quiz">Data warehouse</NavLink></p>
              <p className="subj"><NavLink to="/quiz">Pak Study</NavLink></p>
            </div>
          </div> 
        </div>
      </div>
    </>
  )
}

export default Subject
