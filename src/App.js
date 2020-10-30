import React, {Fragment, useEffect, useState} from "react";
import axios from "axios";
import './App.css';

function App() {

  const [questions, setQuestions] = useState({results: []});
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://opentdb.com/api.php?amount=30&category=27',
      );
      setQuestions(result.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = questions.results.filter(question => 
        question.difficulty === query
    );
    setSearchResult(filteredData);
  }, [query]);

  const renderAllQuestions = () => {
    return questions.results.map((question, index) => (
      <li key={index}>
        <p>{question.question}</p>
      </li>
    ))
  }

  const renderFilteredQuestions = () => {
    return searchResult.map((question, index) => (
      <li key={index}>
        <p>{question.question}</p>
      </li>
    ))
  }
  return (
    <Fragment>
      <div>
        <form value={query} onChange={event => setQuery(event.target.value)}>
          <input type="radio" id="easy" name="difficulty" value="easy"></input>
          <label htmlFor="easy">Easy</label><br></br>
          <input type="radio" id="medium" name="difficulty" value="medium"></input>
          <label htmlFor="medium">Medium</label><br></br>
          <input type="radio" id="hard" name="difficulty" value="hard"></input>
          <label htmlFor="hard">Hard</label><br></br>
        </form>
      </div>
      <ul>
        {query === '' ? renderAllQuestions() : renderFilteredQuestions()}
      </ul>
    </Fragment>
  )
}

export default App;