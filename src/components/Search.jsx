import React, { useState } from 'react';
import '../styles/search.css';

export default function Search() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResult(''); // Clear previous results

    try {
      const res = await fetch('http://localhost:5000/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      setResult(data.result);
    } catch (error) {
      console.error('Search Error:', error);
      setResult("Sorry, I'm having trouble with the search right now.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-page-wrapper">
      <div className="search-container">
        <h2 className="search-title">Search with Attri Ai</h2>
        <div className="search-input-area">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for anything..."
            disabled={loading}
          />
          <button onClick={handleSearch} disabled={loading}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
        {loading && <div className="loading-indicator">Searching...</div>}
        {result && (
          <div className="search-result-box">
            <h3 className="result-title">Results:</h3>
            <div className="result-text">{result}</div>
          </div>
        )}
      </div>
    </div>
  );
}
