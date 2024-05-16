import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import './Popular.css';
import Footer from './Footer';

const Popular = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjQ0Y2JiMzI5MDgyZTk1OTAzZDk2ZjEyODNlM2I2OSIsInN1YiI6IjY2MmVjZjllYTgwNjczMDEyYmU4Zjk1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nYL5Y57gkbQgzUIyklXYX8Hft8YIQH4XvX85IHGgCXk'
        }
      };

      try {
        const response = await axios.request(options);
        setPopularMovies(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <>
    <Header/>
    <div className="container-fluid bg-dark text-light py-4">
      <h1 className="text-center mb-4">Popular Movies</h1>
      <div className="row justify-content-center">
        {popularMovies.map((movie) => {
          const { id, title, poster_path, vote_average } = movie;
          const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
          const movieLink = `/movie/${id}`;

          return (
            <div className="col-sm-6 col-md-3 mb-4" key={id}>
              <Link to={movieLink}>
                <div
                  className="movie-card"
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                  }}
                >
                  <div className="hover-overlay">
                    <i className="bi bi-eye"></i>
                  </div>
                </div>
              </Link>
              <h5 className="text-light mt-2">{title}</h5>
              <p className="text-light">Rating: <i className="bi bi-star-fill text-warning me-2"></i>{vote_average}</p>
            </div>

          );
        })}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Popular;
