import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieDetails from './MovieDetails';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Content.css';

const Content = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularshowAll, setPopularshowAll] = useState(false);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedshowAll, setTopRatedshowAll] = useState(false);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [upcomingshowAll, setUpcomingshowAll] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);


  useEffect(() => {
    const fetchMovies = async () => {
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
        setPopularMovies(popularshowAll ? response.data.results : response.data.results.slice(0, 4));
        console.log(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, [popularshowAll]);

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjQ0Y2JiMzI5MDgyZTk1OTAzZDk2ZjEyODNlM2I2OSIsInN1YiI6IjY2MmVjZjllYTgwNjczMDEyYmU4Zjk1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nYL5Y57gkbQgzUIyklXYX8Hft8YIQH4XvX85IHGgCXk'
        }
      };
      try {
        const response = await axios.request(options);
        setTopRatedMovies(topRatedshowAll ? response.data.results : response.data.results.slice(0, 4));
        console.log(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, [topRatedshowAll]);

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjQ0Y2JiMzI5MDgyZTk1OTAzZDk2ZjEyODNlM2I2OSIsInN1YiI6IjY2MmVjZjllYTgwNjczMDEyYmU4Zjk1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nYL5Y57gkbQgzUIyklXYX8Hft8YIQH4XvX85IHGgCXk'
        }
      };
      try {
        const response = await axios.request(options);
        setUpcomingMovies(upcomingshowAll ? response.data.results : response.data.results.slice(0, 4));
        console.log(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, [upcomingshowAll]);


  const popularHandleShowAll = () => {
    setPopularshowAll(!popularshowAll);
  };
  
  const topRatedHandleShowAll = () => {
    setTopRatedshowAll(!topRatedshowAll);
  };
  
  const upcomingHandleShowAll = () => {
    setUpcomingshowAll(!upcomingshowAll);
  };
  
  const handleMovieDetails = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <>
    <div className="container-fluid bg-dark text-light py-4">
      <h1 className="text-center mb-4">Upcoming Movies</h1>
      
      <Slider>
      {upcomingMovies.map((movie, index) => (
        <div key={index}>
          <div className="card bg-dark text-light h-100">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              className="card-img-top"
              alt={movie.title}
              style={{ width: '100%', height: '600px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">{movie.title} ({movie.release_date.slice(0, 4)})</h5>
              <p className="card-text">Rating: {movie.vote_average}</p>
              <button className="btn btn-primary" onClick={() => handleMovieDetails(movie)}>more infos</button>
            </div>
          </div>
        </div>
      ))}
    </Slider>
      <button className="btn btn-secondary mt-4" onClick={upcomingHandleShowAll}>
        {upcomingshowAll ? 'Show Less' : 'See More'}
      </button>
      {selectedMovie && <MovieDetails movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </div>
    <div className="container-fluid bg-dark text-light py-4">
      <h1 className="text-center mb-4">Popular Movies</h1>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {popularMovies.map((movie, index) => (
          <div className="col" key={index}>
            <div className="card bg-dark text-light h-100">
              <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className="card-img-top" alt={movie.title} />
              <div className="card-body">
                <h5 className="card-title">{movie.title} ({movie.release_date.slice(0,4)})</h5>
                {/* <p className="card-text">{movie.overview}</p> */}
                {/* <p className="card-text">Genre: {movie.genre.join(', ')}</p> */}
                <p className="card-text">Rating: {movie.vote_average}</p>
                <button className="btn btn-primary" onClick={() => handleMovieDetails(movie)}>more infos</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-secondary mt-4" onClick={popularHandleShowAll}>
        {popularshowAll ? 'Show Less' : 'See More'}
      </button>
      {selectedMovie && <MovieDetails movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </div>

    <div className="container-fluid bg-dark text-light py-4">
      <h1 className="text-center mb-4">Top Rated Movies</h1>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {topRatedMovies.map((movie, index) => (
          <div className="col" key={index}>
            <div className="card bg-dark text-light h-100">
              <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className="card-img-top" alt={movie.title} />
              <div className="card-body">
                <h5 className="card-title">{movie.title} ({movie.release_date.slice(0,4)})</h5>
                {/* <p className="card-text">{movie.overview}</p> */}
                {/* <p className="card-text">Genre: {movie.genre.join(', ')}</p> */}
                <p className="card-text">Rating: {movie.vote_average}</p>
                <button className="btn btn-primary" onClick={() => handleMovieDetails(movie)}>more infos</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-secondary mt-4" onClick={topRatedHandleShowAll}>
        {topRatedshowAll ? 'Show Less' : 'See More'}
      </button>
      {selectedMovie && <MovieDetails movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </div>

    </>
  );
};

export default Content;



// import { Carousel } from 'react-bootstrap';

// <Carousel fade>
//           {upcomingMovies.map((movie, index) => (
//             <Carousel.Item key={index}>
//               <div className="card bg-dark text-light h-100">
//               <img
//           src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
//           className="card-img-top"
//           alt={movie.title}
//           style={{ maxWidth: '100%', maxHeight: '600px', objectFit: 'contain' }}
//         />
//                 <div className="card-body">
//                   <h5 className="card-title">{movie.title} ({movie.release_date.slice(0,4)})</h5>
//                   <p className="card-text">Rating: {movie.vote_average}</p>
//                   <button className="btn btn-primary" onClick={() => handleMovieDetails(movie)}>more infos</button>
//                 </div>
//               </div>
//             </Carousel.Item>
//           ))}
//         </Carousel>






// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// <Slider>
//         {upcomingMovies.map((movie, index) => (
//           <div key={index}>
//             <div className="card bg-dark text-light h-100">
//             <img
//               src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
//               className="card-img-top"
//               alt={movie.title}
//               style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
//             />
//               <div className="card-body">
//                 <h5 className="card-title">{movie.title} ({movie.release_date.slice(0, 4)})</h5>
//                 <p className="card-text">Rating: {movie.vote_average}</p>
//                 <button className="btn btn-primary" onClick={() => handleMovieDetails(movie)}>more infos</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>c:\Users\DELL\OneDrive\Bureau\Nouveau dossier (5)\filmdb-main\src\Content.css