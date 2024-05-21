import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import Footer from "./Footer";

import "bootstrap/dist/css/bootstrap.min.css"; // Importation des styles Bootstrap
import FirstRow from "./component/FirstRow";
import SecondRow from "./component/SecondRow";
import ThirdRow from "./component/thirdRow";
import FourthRow from "./component/fourtRow";

const Movie = () => {
  const { id, userID } = useParams();
  const [imdb, setImdb] = useState(null);
  const [movieData, setMovieData] = useState();
  const [backgroundImageUrl, setBackgroundImageUrl] = useState();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      if (id) {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzI3N2U4NzIyNjA4YTNjOGU1YWNjZmQ0ZTVmZDk0ZSIsInN1YiI6IjY2MTVkMjg2YWM0MTYxMDE3YzkyOTlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SCbzx_EgdSfu_R2NVoQ8pGKqwIFfm8tXz-yd3HoLJX8",
          },
        };

        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
            options
          );
          const data = await response.json();
          setImdb(data.imdb_id || null);

          console.log(data);
          setMovieData(data);
          setLoading(false); // Arrêtez le chargement après avoir obtenu les données
        } catch (error) {
          console.error(error);
          setImdb(null);
          setLoading(false); // Arrêtez le chargement en cas d'erreur
        }
      }
    }
    getData();
  }, [id]);

  useEffect(() => {
    if (imdb) {
      const apiKey = "2b73a326";
      const url = `https://www.omdbapi.com/?i=${imdb}&apikey=${apiKey}`;
      axios
        .get(url)
        .then((response) => {
          const donne = response.data;
          setData(donne);
          console.log(donne);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des données de l'API OMDB:",
            error
          );
        });
    }
  }, [imdb]); // Notez que cette dépendance est `imdb` et non `id`

  useEffect(() => {
    if (movieData && movieData.backdrop_path) {
      setBackgroundImageUrl(
        `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`
      );
    }
  }, [movieData]);

  const containerStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    minHeight: "100vh", // Minimum height to cover the viewport
    height: "auto", // Height adjusts to content
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", // Ensure space is distributed evenly
    padding: "20px", // Add some padding to prevent content from touching edges
  };

  return (
    <>
      <Header />
      <section style={{ flexGrow: 1 }}>
        {" "}
        {/* Ensure the section takes all available vertical space */}
        {loading ? (
          <p>Loading...</p>
        ) : data ? (
          <div className="container-fluid" style={containerStyle}>
            <FirstRow data={data} ID={id} />
            <SecondRow userID={userID} data={data} />
            <ThirdRow data={data} />
            <FourthRow data={data} userID={userID} companie={movieData} />
          </div>
        ) : (
          <p>No film available</p>
        )}
      </section>
      <Footer />{" "}
      {/* Include the footer to ensure the layout remains consistent */}
    </>
  );
};

export default Movie;
