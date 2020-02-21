import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('react hooks');

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    const response = await axios.get(
      `http://hn.algolia.com/api/v1/search?query=${query}`
    );

    setResults(response.data.hits);
  };

  const handleSearch = event => {
    event.preventDefault();
    getResults();
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <input
          type='text'
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type='submit' onClick={getResults}>
          Search
        </button>
      </form>
      <ul>
        {results.map(result => {
          return (
            <li key={result.objectID}>
              <a href={result.url}>{result.title}</a>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
