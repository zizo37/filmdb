import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TopRated.css';
import MovieDetails from './MovieDetails';
import Header from './Header';
import Footer from './Footer';

const TopRated = () => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/top_rated',
        params: {
          language: 'en-US',
          page: currentPage,
        },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjQ0Y2JiMzI5MDgyZTk1OTAzZDk2ZjEyODNlM2I2OSIsInN1YiI6IjY2MmVjZjllYTgwNjczMDEyYmU4Zjk1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nYL5Y57gkbQgzUIyklXYX8Hft8YIQH4XvX85IHGgCXk'
        }
      };
      try {
        const response = await axios.request(options);
        setTopRatedMovies(response.data.results);
        console.log(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, [currentPage]);

  const handleMovieDetails = (movie) => {
    setSelectedMovie(movie);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getMovieRanking = (index) => {
    return (currentPage - 1) * 20 + index + 1;
  };

  return (
    <>
    <Header/>
    <div className="watchlist-container">
      <h2 className="watchlist-title">Top Rated Movies</h2>
      <div className="watchlist-movies">
        {topRatedMovies.map((movie, index) => {
          const { id, title, poster_path, vote_average, release_date } = movie;
          const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
          const movieLink = `/movie/${id}`;
          const ranking = getMovieRanking(index);

          return (
            <div className="watchlist-movie-card" key={id}>
              <a href={movieLink}>
                <img
                  src={imageUrl}
                  className="watchlist-movie-image"
                  alt={title}
                  style={{ cursor: 'pointer' }}
                />
              </a>
              <div className="watchlist-movie-details">
                <h3 className="watchlist-movie-title">{ranking}. {title}</h3>
                <p>Release Date: {release_date}</p>
                <p className="text-light">
                  Rating: <i className="bi bi-star-fill text-warning me-2"></i>
                  {vote_average.toFixed(2)}
                </p>
              </div>
              <div className="info-icon-container">
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => handleMovieDetails(movie)}
                >
                  <i className="bi bi-info-circle"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pagination">
        <button
          className="btn btn-secondary"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button className="btn btn-secondary" onClick={handleNextPage}>
          Next
        </button>
      </div>
      {selectedMovie && (
        <MovieDetails movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
    <Footer />
    </>
  );
};

export default TopRated;