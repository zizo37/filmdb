import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieDetails = ({ movie, onClose }) => {
  const fetchMovieDetails = async () => {
    const options = {
      method: 'GET',
      url: `https://imdb-top-100-movies.p.rapidapi.com/${movie.id}`,
      headers: {
        'X-RapidAPI-Key': 'ba3332dac0msh515089fda960f3dp14f830jsnc01ba0e1578f',
        'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      // Update the state or component with the detailed movie information
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [movie]);

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-dark text-light">
          <div className="modal-header">
            <h5 className="modal-title">{movie.title}</h5>
            <button type="button" className="close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Rating: {movie.vote_average}</p>
            <p>Year: {movie.release_date.slice(0,4)}</p>
            {/* <p>Genre: {movie.genre.join(', ')}</p> */}
            <p>Description: {movie.overview}</p>
            {/* Add more detailed movie information here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;