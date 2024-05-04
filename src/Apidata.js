
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';

const Apidata = () => {
  const { title } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function getData() {
      if (title) {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzI3N2U4NzIyNjA4YTNjOGU1YWNjZmQ0ZTVmZDk0ZSIsInN1YiI6IjY2MTVkMjg2YWM0MTYxMDE3YzkyOTlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SCbzx_EgdSfu_R2NVoQ8pGKqwIFfm8tXz-yd3HoLJX8',
          },
        };

        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${title}?language=en-US`,
            options
          );
          const data = await response.json();
          setMovie(data || null);
        } catch (error) {
          console.error(error);
          setMovie(null);
        }
      }
    }
    getData();
  }, [title]);

  return (
    <>
      <Header />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '90vh',
          backgroundColor: '#282c34',
        }}
      >
        {movie ? (
          <div
            style={{
              maxWidth: '300px', 
              padding: '20px',
              borderRadius: '10px',
              backgroundColor: '#ffffff',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
            }}
          >
            <h2 style={{ color: '#000000' }}>{movie.title}</h2>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                style={{ maxWidth: '100%', marginBottom: '20px' }}
              />
            )}
            <p style={{ color: '#000000' }}>{movie.overview}</p>
            <p style={{ color: '#000000' }}>Release Date: {movie.release_date}</p>
            {/* Add more movie details as needed */}
          </div>
        ) : (
          <p style={{ color: '#ffffff' }}>Loading...</p>
        )}
      </div>
    </>
  );
};

export default Apidata;