import React , {useEffect, useState} from 'react'
import Sub from '../sub.png'
import { NavLink } from "react-router-dom"
import './index.css'
import axios from 'axios';


// function Subject() {
//   const [subjects, setSubjects] = useState([]);

//   useEffect(() => {
//     async function fetchSubjects() {
//       const response = await fetch('/subjects');
//       const data = await response.json();
//       setSubjects(data);
//     }
//     fetchSubjects();
//   }, []);

//   return (
//     <>
//       <h1>List of Subjects</h1>
//       <ul>

//         {subjects.map(subject => (




//           <li key={subject._id}>{subject.name}</li>


          
//         ))}
//       </ul>


      
//     </>
//   );
// }


function Subject () {

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    async function fetchSubjects() {
      const response = await fetch('/subjects');
      const data = await response.json();
      setSubjects(data);
    }
    fetchSubjects();
  }, []);

  return (
    
  <>
  <div className="subject" style={{
  backgroundImage: `url(${Sub})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '100vh'
}}>
  <div className="container">
    <div className="round">
      <h1>Quiz <span> Round 1 </span></h1>
    </div>
    <div className="sub">
      <div className="sub-title text-center text-white">
        <h2>Select Subject</h2>
      </div>
      <div className="sub-content">
        
          {subjects.map(subject => (
            <p  key={subject._id} className="subj">
              <NavLink to="/quiz">{subject.name}</NavLink>
            </p>
          ))}
        
      </div>
    </div>
  </div>
</div>
    
      {/* <h1>List of Subjects</h1>
      <div>
    
        {subjects.map(subject => (
          
          <li key={subject._id}>{subject.name}</li>
        ))}
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
            
            
              <p className="subj"><NavLink to="/quiz">Database </NavLink></p>
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
      </div> */}
    </>
  );
}

export default Subject
