import React, {Fragment, useEffect, useState} from "react";
import axios from "axios";
import './App.css';

function App() {

  const [questions, setQuestions] = useState({results: []});
  const [query, setQuery] = useState('redux');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://opentdb.com/api.php?amount=30&category=27',
      );
      setQuestions(result.data);
    }
    fetchData();
  }, []);

  return (
    <Fragment>
      <div>
        <input type="radio" id="easy" name="difficulty" value="easy"></input>
        <label for="easy">Easy</label><br></br>
        <input type="radio" id="medium" name="difficulty" value="medium"></input>
        <label for="medium">Medium</label><br></br>
        <input type="radio" id="hard" name="difficulty" value="hard"></input>
        <label for="hard">Hard</label><br></br>
      </div>
      <ul>
        {questions.results.map((question, index) => (
          <li key={index}>
            <p>{question.question}</p>
          </li>
        ))}
      </ul>
    </Fragment>
  )


}

export default App;