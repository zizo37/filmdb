// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const MovieDetails = ({ movie, onClose }) => {
//   const fetchMovieDetails = async () => {
//     const options = {
//       method: 'GET',
//       url: `https://imdb-top-100-movies.p.rapidapi.com/${movie.id}`,
//       headers: {
//         'X-RapidAPI-Key': 'ba3332dac0msh515089fda960f3dp14f830jsnc01ba0e1578f',
//         'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
//       }
//     };

//     try {
//       const response = await axios.request(options);
//       console.log(response.data);
//       // Update the state or component with the detailed movie information
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchMovieDetails();
//   }, [movie]);

//   return (
//     <div className="modal" style={{ display: 'block' }}>
//       <div className="modal-dialog modal-dialog-centered">
//         <div className="modal-content bg-dark text-light">
//           <div className="modal-header">
//             <h5 className="modal-title">{movie.title}</h5>
//             <button type="button" className="close" onClick={onClose}>
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//           <div className="modal-body">
//             <p>Rating: {movie.vote_average}</p>
//             <p>Year: {movie.release_date.slice(0,4)}</p>
//             {/* <p>Genre: {movie.genre.join(', ')}</p> */}
//             <p>Description: {movie.overview}</p>
//             {/* Add more detailed movie information here */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieDetails;







// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaStar, FaCalendarAlt, FaCloudDownloadAlt } from 'react-icons/fa';

// const MovieDetails = ({ movie, onClose }) => {
//   const fetchMovieDetails = async () => {
//     const options = {
//       method: 'GET',
//       url: `https://imdb-top-100-movies.p.rapidapi.com/${movie.id}`,
//       headers: {
//         'X-RapidAPI-Key': 'ba3332dac0msh515089fda960f3dp14f830jsnc01ba0e1578f',
//         'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
//       }
//     };

//     try {
//       const response = await axios.request(options);
//       console.log(response.data);
//       // Update the state or component with the detailed movie information
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchMovieDetails();
//   }, [movie]);

//   return (
//     <div className="modal d-block" tabIndex="-1" role="dialog">
//       <div className="modal-dialog modal-dialog-centered modal-lg">
//         <div className="modal-content bg-dark text-light">
//           <div className="modal-header border-0">
//             <h5 className="modal-title">{movie.title}</h5>
//             <button type="button" className="close" onClick={onClose}>
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//           <div className="modal-body">
//             <div className="row">
//               <div className="col-md-4">
//                 <img
//                   src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
//                   className="img-fluid rounded"
//                   alt={movie.title}
//                 />
//               </div>
//               <div className="col-md-8">
//                 <div className="d-flex align-items-center mb-3">
//                   <FaStar className="text-warning me-2" />
//                   <span>{movie.vote_average}</span>
//                 </div>
//                 <div className="d-flex align-items-center mb-3">
//                   <FaCalendarAlt className="me-2" />
//                   <span>{movie.release_date.slice(0, 4)}</span>
//                 </div>
//                 <p className="mb-4">{movie.overview}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieDetails;











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
