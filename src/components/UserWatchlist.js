import { createClient } from "@supabase/supabase-js";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleMovieClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <div
      style={{ color: "white", textAlign: "center" }}
      onClick={handleMovieClick}
      className="movie-card"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={{ width: "200px", height: "200px" }}
      />
      <h3 style={{ fontSize: "20px", margin: "10px auto" }}>
        Title: {movie.title}
      </h3>
      {/* <p>Overview: {movie.overview}</p> */}
    </div>
  );
};

const UserWatchlist = () => {
  const supabaseUrl = "https://ksnouxckabitqorjucgz.supabase.co";
  const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzbm91eGNrYWJpdHFvcmp1Y2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0MzM4ODgsImV4cCI6MjAzMDAwOTg4OH0.17MF1DByop1lCcnefGB8t3AcS1CGcJvbzunwY3QbK_c";
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const [session, setSession] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [movies, setMovies] = useState([]);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching user data:", error.message);
      } else {
        setSession(data.session);
        setUserData(data.session.user);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
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
          console.log(data);
        }
      };

      fetchWatchlistData();
    }
  }, [userData]);

  const fetchMovieDetails = async (movieId) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer b2efe9b0108d8645f514bc9b0363d199",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=b2efe9b0108d8645f514bc9b0363d199`,
      options
    )
      .then((response) => response.json())
      // .then((response) => console.log(response))
      .then((response) => setMovies((prevMovies) => [...prevMovies, response]))
      // .then(console.log(movie))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    watchlist.forEach((item) => {
      fetchMovieDetails(item.movie_id);
    });
    setMovies([]);
  }, [watchlist]);

  return (
    <div className="watchlist">
      <div className="lists">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ color: "gold" }}>Your Lists</h2>
          <a href="./watchlistCreate">Create New Watchlist</a>
        </div>
        <p color="white">Share movie,</p>
      </div>
      <h2 style={{ color: "gold" }}>Your Watchlist</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          margin: "10px",
        }}
      >
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <div>No movie in the watch List</div>
        )}
      </div>
    </div>
  );
};

export default UserWatchlist;
