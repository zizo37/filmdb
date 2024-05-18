import React from 'react';
import './ChatbotApp.css';

const MovieList = ({ steps }) => {
  const genre = steps.userInput.value.trim();
  const movies = steps.fetchMovies.value;

  return (
    <div className="chatbot-message">
      {movies.length > 0 ? (
        <div>
          <p>Here are our recommendations for the {genre} genre:</p>
          <ul>
            {movies.map((movie, index) => (
              <li key={index}>{movie.title}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No movies found for the {genre} genre.</p>
      )}
    </div>
  );
};

export default MovieList;
