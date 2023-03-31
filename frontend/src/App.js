import React from 'react'


import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import {  Router, Routes, Route } from "react-router-dom";
import Login from './component/login'
// import Main from './component/main';
import Start from './component/start';
import Subject from './component/subject';
import Quiz from './component/quiz';
import Teams from './component/teams';
import Main2 from './component/main2';
// import Dropdown from './component/dropdown';
import DropdownSelect from './component/DropdownSelect';
import ResultsPage from './component/ResultPage';

const App = () => {
  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={Login } />
            <Route index element={<Login />} />
            {/* <Route path="main" element={<Main />} /> */}
            <Route path="main2" element={<Main2 />} />
            <Route path="start" element={<Start />} />
            <Route path="subject" element={<Subject />} />
            <Route path="Quiz" element={<Quiz />} />
            <Route path="teams" element={<Teams />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="dropdownselect" element={<DropdownSelect />} />
            {/* <Route path="dropdown" element={<Dropdown />} /> */}


        </Routes>
      </BrowserRouter>

      {/* <Router>

          <Routes>
            <Route exact path="/" component={Login} />
            <Route exact path="/main" component={Main} />
            <Route path="/start" component={Start} />
            <Route path="/subject" component={Subject} />
            <Route path="/quiz" component={Quiz} />
          </Routes>
      </Router> */}



    </>
  )
}

export default App

