import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Header from './Header';


const supabase = createClient('https://ksnouxckabitqorjucgz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzbm91eGNrYWJpdHFvcmp1Y2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0MzM4ODgsImV4cCI6MjAzMDAwOTg4OH0.17MF1DByop1lCcnefGB8t3AcS1CGcJvbzunwY3QbK_c');


const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [user, setUser] = useState(null);
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) {
          console.error('Error fetching user data:', userError);
        } else {
          setUser(userData.user || null);
        }

        
        const { data: watchlistData, error: watchlistError } = await supabase
          .from('watchlist')
          .select('*')
          .eq('user_id', userData.user?.id);

        if (watchlistError) {
          console.error('Error fetching watchlist data:', watchlistError);
        } else {
          setWatchlist(watchlistData || []);
        }

        
        const movieDataPromises = watchlistData.map(async (item) => {
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
              `https://api.themoviedb.org/3/movie/${item.movie_id}?language=en-US`,
              options
            );
            const data = await response.json();
            return data;
          } catch (error) {
            console.error('Error fetching movie data:', error);
            return null;
          }
        });

        const resolvedMovieData = await Promise.all(movieDataPromises);
        setMovieData(resolvedMovieData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        {movieData.map((movie, index) =>
          movie ? (
            <div
              key={watchlist[index].id}
              style={{
                maxWidth: '300px',
                padding: '20px',
                margin: '10px',
                borderRadius: '10px',
                backgroundColor: '#ffffff',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
              }}
            >
              <h2 style={{ color: '#000000' }}>{watchlist[index].movie_id}</h2>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                style={{ maxWidth: '100%', marginBottom: '20px' }}
              />
              <p style={{ color: '#000000' }}>{movie.overview}</p>
              <p style={{ color: '#000000' }}>Release Date: {movie.release_date}</p>
              <p style={{ color: '#000000' }}>Rating: {movie.vote_average}</p>
              <p style={{ color: '#000000' }}>
                Genres:{' '}
                {movie.genres.map((genre, index) => (
                  <span key={genre.id}>
                    {genre.name}
                    {index !== movie.genres.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
            </div>
          ) : null
        )}
      </div>
    </>
  
  );
};

export default Watchlist;