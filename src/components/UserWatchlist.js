import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useTransition, animated } from "react-spring";
import { useTransition, animated } from "@react-spring/web";

const UserWatchlist = () => {
  const supabaseUrl = "https://ksnouxckabitqorjucgz.supabase.co";
  const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzbm91eGNrYWJpdHFvcmp1Y2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0MzM4ODgsImV4cCI6MjAzMDAwOTg4OH0.17MF1DByop1lCcnefGB8t3AcS1CGcJvbzunwY3QbK_c";
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const [session, setSession] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  const [userData, setUserData] = useState(null);
  const [movie_id, setMovie_id] = useState(null);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching user data:", error.message);
      } else {
        setSession(data.session);
        setUserData(data.session.user);
        console.log(session);
        console.log(userData);
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
          setMovie_id(data.movie_id);
          // eslint-disable-next-line array-callback-return
        }
      };

      fetchWatchlistData();
    }
  }, [userData]);
  const fetchMovieDetails = async () => {
    const options = {
      method: "GET",
      url: `https://imdb-top-100-movies.p.rapidapi.com/${movie_id}`,
      headers: {
        "X-RapidAPI-Key": "ba3332dac0msh515089fda960f3dp14f830jsnc01ba0e1578f",
        "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setMovie(response.data);
      // Mettez à jour l'état ou le composant avec les informations détaillées du film
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    watchlist.forEach((item) => {
      fetchMovieDetails(item.movie_id);
    });
  }, [watchlist]);

  const transitions = useTransition(watchlist, {
    from: { opacity: 0, transform: "translate3d(0,-40px,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0px,0)" },
    leave: { opacity: 0, transform: "translate3d(0,-40px,0)" },
  });

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
          <h2 style={{ color: "gold" }}> Your Lists</h2>
          <a href="./watchlistCreate"> Create New Watchlist</a>
        </div>
        <p color="White">Share movie ,</p>
      </div>
      <h2 style={{ color: "gold" }}>Your Watchlist</h2>
      {watchlist && movie ? (
        transitions((style, movie) => (
          <animated.div
            style={{ ...style, color: "white" }}
            key={movie.movie_id}
          >
            Movie ID: {movie.title}
          </animated.div>
        ))
      ) : (
        <p>No watchlist available.</p>
      )}
    </div>
  );
};

export default UserWatchlist;
