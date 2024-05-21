import React, { useState, useEffect } from 'react';
import './ChatbotApp.css';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import axios from 'axios';
import FetchMovies from './FetchMovies'; // Ensure this is correctly imported
import MovieList from './MovieList'; // Ensure this is correctly imported

const ChatbotApp = () => {
  const [genres, setGenres] = useState([]);
  const theme = {
    background: '#f5f8fb',
    fontFamily: 'Roboto',
    headerBgColor: '#ffca2c',
    headerFontColor: '#212529',
    headerFontSize: '20px',
    botBubbleColor: '#ffca2c',
    botFontColor: '#212529',
    userBubbleColor: '#ffca2c',
    userFontColor: '#212529',
  };

  useEffect(() => {
    axios.get('https://moviesminidatabase.p.rapidapi.com/genres/', {
      headers: {
        'X-RapidAPI-Key': '159f3d420emsh8898d8b0b9ceeeep1aadcfjsn48e50e310218',
        'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
      }
    })
    .then(response => {
      const genres = response.data.results.map(result => result.genre);
      setGenres(genres);
      console.log('Fetched genres:', genres);
    })
    .catch(error => console.error('Error fetching genres:', error));
  }, []);

  return (
    <div className="App">
      {genres.length > 0 && (
          <ThemeProvider theme={theme}>
            <ChatBot
              steps={[
                {
                  id: '1',
                  message: 'Hello! What type of movie are you in the mood for? (e.g., Comedy, Drama, Action)',
                  trigger: 'userInput',
                },
                {
                  id: 'userInput',
                  user: true,
                  validator: (value) => {
                    const inputGenre = value.trim();
                    if (genres.includes(inputGenre)) {
                      return true;
                    } else {
                      return 'Please enter a valid genre.';
                    }
                  },
                  trigger: 'fetchMovies',
                },
                {
                  id: 'fetchMovies',
                  component: <FetchMovies />,
                  waitAction: true,
                  trigger: 'showMovies',
                },
                {
                  id: 'showMovies',
                  component: <MovieList />,
                  end: true,
                },
              ]}
              floating={true}
            />
        </ThemeProvider>
      )}
    </div>
  );
};

export default ChatbotApp;