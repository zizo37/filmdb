import React from 'react';
import './searchResultsDropdown.css';

const SearchResultsDropdown = ({ searchResults }) => {
  return (
    <div className="search-results-dropdown">
      {searchResults.map((result, index) => (
        <div key={index} className="search-result-item d-flex align-items-center">
          {result.i && (
            <img
              src={result.i.imageUrl}
              alt={result.l}
              className="search-result-image"
            />
          )}
          <span>{result.l}</span>
        </div>
      ))}
    </div>
  );
};

export default SearchResultsDropdown;