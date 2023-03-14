import React from 'react';


function ResultsPage(props) {
  const { Users } = props.location.state;

  return (
    <div>
      <h1>Results Page</h1>
      <p>{Users}</p>
      <p>{props.TeamMem1}</p>
      <p>{props.TeamMem2}</p>
      <p>{props.TeamMem3}</p>
      <p>{props.TeamMem4}</p>
    </div>
  );
}

export default ResultsPage;