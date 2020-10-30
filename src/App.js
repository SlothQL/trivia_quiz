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

  const displayIncorrectAnswers = (answer) => {
    const incorrectAnswer = (
      <div>
        <input type="radio" id="incorrect_answers" name="answers" value="incorrect_answers"></input>
        <label htmlFor="incorrect_answers">{answer}</label>
      </div>
      );
    return incorrectAnswer;
  }

  const displayCorrectAnswer = (question) => {
    const correctAnswer = (
      <div>
        <input type="radio" id="correct_answer" name="answers" value="correct_answer"></input>
        <label htmlFor="correct_answer">{question.correct_answer}</label>
      </div>
    );
    return correctAnswer;
  }

  const renderAllQuestions = () => {
    return questions.results.map((question, index) => (
      <li key={index}>
        <p>{question.question}</p><br></br>
        <p>Answers:</p><br></br>
        {displayCorrectAnswer(question)}
        {question.incorrect_answers.map((answer, index) => (
          displayIncorrectAnswers(answer)
        ))}
      </li>
    ))
  }

  const renderFilteredQuestions = () => {
    return searchResult.map((question, index) => (
      <li key={index}>
        <p>{question.question}</p>
        <p>Answers:</p><br></br>
        {displayCorrectAnswer(question)}
        {question.incorrect_answers.map((answer, index) => (
          displayIncorrectAnswers(answer)
        ))}
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