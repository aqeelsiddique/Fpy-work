import React, { useState , history} from 'react';
import teamData from './api/team';

function DropdownSelect() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleButtonClick = () => {
    // Retrieve the data from the API file based on the selected option
    const Users = teamData[selectedOption];

    // Navigate to another page and pass the data as props
    history.push('/results', { Users });
  };

  return (
    <div>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="Round1">Option 1</option>
        <option value="Round2">Option 2</option>
        <option value="Round3">Option 3</option>
        <option value="Round4">Option 4</option>
      </select>
      <button onClick={handleButtonClick}>Submit</button>
    </div>
  );
}

export default DropdownSelect;