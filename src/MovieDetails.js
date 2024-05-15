import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaCalendarAlt, FaDownload } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import './MovieDetails.css';



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
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <IoIosClose className="close-icon" onClick={onClose} />
        </div>
        <div className="modal-body">
          <div className="movie-details">
            <div className="movie-poster">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            <div className="movie-info">
              <h2 className="movie-title">{movie.title}</h2>
              <div className="movie-rating">
                <FaStar className="rating-icon" />
                <span>{movie.vote_average}</span>
              </div>
              <div className="movie-year">
                <FaCalendarAlt className="year-icon" />
                <span>{movie.release_date.slice(0, 4)}</span>
              </div>
              <p className="movie-overview">{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
