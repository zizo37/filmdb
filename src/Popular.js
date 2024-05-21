// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import Header from './Header';
// import './Popular.css';
// import Footer from './Footer';

// const Popular = () => {
//   const [popularMovies, setPopularMovies] = useState([]);

//   useEffect(() => {
//     const fetchPopularMovies = async () => {
//       const options = {
//         method: 'GET',
//         url: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
//         headers: {
//           accept: 'application/json',
//           Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjQ0Y2JiMzI5MDgyZTk1OTAzZDk2ZjEyODNlM2I2OSIsInN1YiI6IjY2MmVjZjllYTgwNjczMDEyYmU4Zjk1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nYL5Y57gkbQgzUIyklXYX8Hft8YIQH4XvX85IHGgCXk'
//         }
//       };

//       try {
//         const response = await axios.request(options);
//         setPopularMovies(response.data.results);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchPopularMovies();
//   }, []);

//   return (
//     <>
//     <Header/>
//     <div className="container-fluid bg-dark text-light py-4">
//       <h1 className="text-center mb-4">Popular Movies</h1>
//       <div className="row justify-content-center">
//         {popularMovies.map((movie) => {
//           const { id, title, poster_path, vote_average } = movie;
//           const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
//           const movieLink = `/movie/${id}`;

//           return (
//             <div className="col-sm-6 col-md-3 mb-4" key={id}>
//               <Link to={movieLink}>
//                 <div
//                   className="movie-card"
//                   style={{
//                     backgroundImage: `url(${imageUrl})`,
//                   }}
//                 >
//                   <div className="hover-overlay">
//                     <i className="bi bi-eye"></i>
//                   </div>
//                 </div>
//               </Link>
//               <h5 className="text-light mt-2">{title}</h5>
//               <p className="text-light">Rating: <i className="bi bi-star-fill text-warning me-2"></i>{vote_average}</p>
//             </div>

//           );
//         })}
//       </div>
//     </div>
//     <Footer/>
//     </>
//   );
// };

// export default Popular;






import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import './Popular.css';
import Footer from './Footer';

const Popular = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

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

  useEffect(() => {
    const fetchGenres = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzI3N2U4NzIyNjA4YTNjOGU1YWNjZmQ0ZTVmZDk0ZSIsInN1YiI6IjY2MTVkMjg2YWM0MTYxMDE3YzkyOTlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SCbzx_EgdSfu_R2NVoQ8pGKqwIFfm8tXz-yd3HoLJX8'
        }
      };

      try {
        const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
        setGenres(response.data.genres);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreClick = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter(id => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  const filteredMovies = selectedGenres.length > 0
    ? popularMovies.filter(movie =>
        movie.genre_ids.some(id => selectedGenres.includes(id))
      )
    : popularMovies;

  return (
    <>
      <Header />
      <div className="container-fluid bg-dark text-light py-4">
        <h1 className="text-center mb-4">Popular Movies</h1>
        <div className="genre-filter mb-4">
          <h3>Filter by Genre:</h3>
          <div>
            {genres.map(genre => (
              <button
                key={genre.id}
                onClick={() => handleGenreClick(genre.id)}
                className={`genre-btn ${selectedGenres.includes(genre.id) ? 'active' : ''}`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
        <div className="row justify-content-center">
          {filteredMovies.map(movie => {
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
      <Footer />
    </>
  );
};

export default Popular;