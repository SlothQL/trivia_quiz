import React, {useEffect, useState} from "react";
import axios from "axios";
import './App.css';

function App() {

  const [questions, setQuestions] = useState({results: []});

  useEffect(async () => {
    const result = await axios(
      'https://opentdb.com/api.php?amount=30&category=27',
    );
    setQuestions(result.data);
  }, []);

  return (
    <ul>
      {questions.results.map((question, index) => (
        <li key={index}>
          <p>{question.question}</p>
        </li>
      ))}
    </ul>
  )


}

export default App;