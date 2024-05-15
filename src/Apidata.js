import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import YouTube from 'react-youtube';
import './Apidata.css';

const Apidata = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function getData() {
      if (id) {
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
            `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
            options
          );
          const data = await response.json();
          setMovie(data || null);
          console.log(data)
        } catch (error) {
          console.error(error);
          setMovie(null);
        }
      }
    }
    getData();
  }, [id]);

  useEffect(() => {
    const getVideos = async () => {
      if (movie) {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=dc277e8722608a3c8e5accfd4e5fd94e&language=en-US`
          );
          const data = await response.json();
          setVideos(data.results || []);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getVideos();
  }, [movie]);

  return (
    <>
      <Header />
      {movie && (
        <div
          className="movie-details"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
              </div>
              <div className="col-md-8">
                <div className="movie-info">
                  <h2 className="movie-title">{movie.title}</h2>
                  <div className="movie-meta">
                    <p className="movie-release-date">
                      Release Date: {movie.release_date}
                    </p>
                    <p className="movie-genre">
                      Genres:{' '}
                      {movie.genres.map((genre, index) => (
                        <span key={genre.id}>
                          {genre.name}
                          {index !== movie.genres.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </p>
                    <p className="movie-production-company">
                      Production Company:{' '}
                      {movie.production_companies[0]?.name}{' '}
                      {movie.production_companies[0]?.logo_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w92/${movie.production_companies[0].logo_path}`}
                          alt={movie.production_companies[0].name}
                          className="production-company-logo"
                        />
                      )}
                    </p>
                  </div>
                  <p className="movie-overview">{movie.overview}</p>
                  {videos.length > 0 && (
                    <div className="movie-trailer">
                      <YouTube
                        videoId={videos[0].key}
                        opts={{ width: '100%' }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Apidata;