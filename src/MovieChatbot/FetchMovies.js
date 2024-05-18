import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatbotApp.css'; // Ensure your styles are defined here

const FetchMovies = ({ steps, triggerNextStep }) => {
  const [movies, setMovies] = useState([]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const chosenGenre = steps.userInput.value.trim();
    axios.get(`https://moviesminidatabase.p.rapidapi.com/movie/byGen/${chosenGenre}/`, {
      headers: {
        'X-RapidAPI-Key': '159f3d420emsh8898d8b0b9ceeeep1aadcfjsn48e50e310218',
        'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
      }
    })
    .then(response => {
      let fetchedMovies = response.data.results || [];
      fetchedMovies = shuffleArray(fetchedMovies).slice(0, 3); // Shuffle and pick the first 3
      setMovies(fetchedMovies);
      triggerNextStep({ value: fetchedMovies });
    })
    .catch(err => {
      console.error('Error fetching movies:', err);
      triggerNextStep({ value: [] });
    });
  }, [steps, triggerNextStep]);

  useEffect(() => {
    if (movies.length > 0) {
      triggerNextStep();
    }
  }, [movies, triggerNextStep]);

  return (
    <div className="chatbot-message">
      Loading ...
    </div>
  );
};

export default FetchMovies;
