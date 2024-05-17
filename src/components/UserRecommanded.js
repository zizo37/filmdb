import { createClient } from "@supabase/supabase-js";
// import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import "./UserRecommandation.module.css";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleMovieClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      onClick={handleMovieClick}
      style={{
        backgroundColor: "#000",
        color: "#fff",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        margin: "10px",
        width: "300px",
        height: "350px",
        textAlign: "center",
        cursor: "pointer",
      }}
      className="movie_card"
      key={movie.id}
    >
      <img
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        style={{ width: "200px", height: "200px" }}
        alt={movie.title}
      />

      <h3 style={{ fontSize: "20px", margin: "10px auto" }}>{movie.title}</h3>
    </div>
  );
};
const UserRecommanded = () => {
  const supabaseUrl = "https://ksnouxckabitqorjucgz.supabase.com";
  const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzbm91eGNrYWJpdHFvcmp1Y2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0MzM4ODgsImV4cCI6MjAzMDAwOTg4OH0.17MF1DByop1lCcnefGB8t3AcS1CGcJvbzunwY3QbK_c";
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const [session, setSession] = useState(null);
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState([]);
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [watchlist, setWatchlist] = useState([]);

  const listRef = useRef();
  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching user data:", error.message);
      } else {
        setSession(data.session);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (session) {
      const fetchWatchlistData = async () => {
        const { data, error } = await supabase
          .from("watchlist")
          .select("movie_id")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching watchlist:", error.message);
        } else {
          setWatchlist(data);
        }
      };

      fetchWatchlistData();
    }
  }, [session]);

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 60;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 16) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };

  // const fetchMovieDetails1 = async (movieId) => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       accept: "application/json",
  //
  //     },
  //   };

  //   fetch(
  //     `https://api.themoviedb.org/3/find/${movieId}?api_key=b2efe9b0108d8645f514bc9b0363d199&external_source=imdb_id`,
  //     options
  //   )
  //     .then((response) => response.json())
  //     .then((response) => {
  //       console.log(response.movie_results);
  //       setMovie(response.movie_results);
  //       console.log(movie);
  //     })
  //     .catch((err) => console.error(err));
  // };

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     for (const item of watchlist) {
  //       await fetchMovieDetails1(item.movie_id);
  //     }
  //   };

  //   fetchMovies();

  //   setMovies([]);
  // }, [watchlist]);
  // const fetchMovieDetails = async (movieId) => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       accept: "application/json",
  //       Authorization:
  //         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMmVmZTliMDEwOGQ4NjQ1ZjUxNGJjOWIwMzYzZDE5OSIsInN1YiI6IjY1ZDM1MDA1YTMxM2I4MDE3ZDcwZWZlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Z8K-IJ9So5TtIEyf-DnrmoveidcHE1D07fi7bbScSCM",
  //     },
  //   };

  //   fetch(
  //     `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`,
  //     options
  //   )
  //     .then((response) => response.json())
  //     // .then((response) => console.log(response.results))
  //     .then((response) =>
  //       setMovies((prevMovie) => [...prevMovie, response.results])
  //     )

  //     .then(console.log(movies))
  //     .catch((err) => console.error(err));
  // };

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     for (const item of movie) {
  //       for (const i of item) {
  //         await fetchMovieDetails(i.movie_id);

  //         console.log(i.movie_id);
  //       }
  //       console.log(item);
  //     }
  //   };

  //   fetchMovies();
  //   setMovies([]);
  // }, []);

  return (
    <div className="wrapper" style={{ overflow: "hidden" }}>
      <div>
        <h2 style={{ color: "gold" }}>Your Recommended</h2>
        <p style={{ color: "white" }}>Your recommended</p>
      </div>
      <div>
        <ArrowBackIosOutlined
          className=" left"
          onClick={() => handleClick("left")}
          style={{
            display: !isMoved && slideNumber > 0 ? "none" : undefined,
          }}
        />

        <div
          ref={listRef}
          // className="container"
        >
          {session && movies.length > 0 ? (
            movies.map((innerArray) => (
              <div
                key={innerArray}
                className="container"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {innerArray.map((item) => (
                  <MovieCard key={item.id} movie={item} />
                ))}
              </div>
            ))
          ) : (
            // <div
            //   key={movies[0].id}
            //   className="container"
            //   style={{
            //     display: "flex",
            //     justifyContent: "space-between",
            //     alignItems: "center",
            //   }}
            // >
            //   {movies[0].map((item) => (
            //     <MovieCard key={item.id} movie={item} />
            //   ))}
            // </div>
            // <div
            //   key={movies[0].id}
            //   className="container"
            //   style={{
            //     display: "flex",
            //     justifyContent: "space-between",
            //     alignItems: "center",
            //   }}
            // >
            //   {movies[0].map((item) => (
            //     <MovieCard key={item.id} movie={item} />
            //   ))}
            // </div>
            <div>No Movie in watchlist</div>
          )}
        </div>

        <ArrowForwardIosOutlined
          className="right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};
export default UserRecommanded;
