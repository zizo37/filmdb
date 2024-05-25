import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        width: "250px",
        height: "300px",
        textAlign: "center",
        cursor: "pointer",
      }}
      className="movie_card"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={{ width: "200px", height: "200px" }}
      />
      <h3 style={{ fontSize: "20px", margin: "10px auto" }}>{movie.title}</h3>
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

  const fetchMovieDetails = async (movieId) => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${movieId}`,
      params: {
        api_key: "b2efe9b0108d8645f514bc9b0363d199",
      },
    };

    try {
      const response = await axios.request(options);
      setMovies((prevMovies) => [...prevMovies, response.data]);
      // console.log(movies);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      for (const item of watchlist) {
        await fetchMovieDetails(item.movie_id);
        // console.log(item);
      }
    };

    fetchMovies();

    setMovies([]);
  }, [watchlist]);

  return (
    <div className="watchlist">
      <div className="lists">
        <div>
          <h2 style={{ color: "gold" }}>Your Lists</h2>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {movies ? (
              movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
            ) : (
              <div>No movies in the watchlist </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWatchlist;
