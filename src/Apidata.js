import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './Header';

const Apidata = () => {
  const { title } = useParams(); 
  const [movie, setMovie] = useState(null); 

  useEffect(() => {
    async function getData() {
      if (title) {
        const options = {
          method: "GET",
          url: `https://imdb8.p.rapidapi.com/title/get-details`,
          params: {
            tconst: title
          },
          headers: {
            "X-RapidAPI-Key": "ba3332dac0msh515089fda960f3dp14f830jsnc01ba0e1578f",
            "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
          },
        };

        try {
          const response = await axios.request(options);
          setMovie(response.data || null); 
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
    <Header/>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "90vh", backgroundColor: "#282c34" }}>
      {movie ? (
        <div style={{ maxWidth: "500px", padding: "20px", borderRadius: "10px", backgroundColor: "#ffffff", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", textAlign: "center" }}>
          <h2 style={{ color: "#000000" }}>{movie.title}</h2>
          {movie.image && (
            <img src={movie.image.url} alt={movie.title} style={{ maxWidth: "100%", marginBottom: "20px" }} />
          )}
          <p style={{ color: "#000000" }}>Type: {movie.titleType}</p>
          <p style={{ color: "#000000" }}>Release Date: {movie.year}</p>
          {/* <p style={{color:"white"}}>Genres: {movie.genres && movie.genres.join(', ')}</p>
          <p style={{color:"white"}}>Runtime: {movie.runtimeStr}</p>
          <p style={{color:"white"}}>Rating: {movie.ratings && movie.ratings.rating}</p>
          <p style={{color:"white"}}>Director: {movie.directors && movie.directors.join(', ')}</p>
          <p style={{color:"white"}}>Actors: {movie.principals && movie.principals.map(actor => actor.name).join(', ')}</p> */}
        </div>
      ) : (
        <p style={{ color: "#ffffff" }}>Loading...</p>
      )}
    </div>
    </>
  );
};

export default Apidata;
