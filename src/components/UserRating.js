import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Userrating = () => {
  const supabaseUrl = "https://ksnouxckabitqorjucgz.supabase.co";
  const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzbm91eGNrYWJpdHFvcmp1Y2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0MzM4ODgsImV4cCI6MjAzMDAwOTg4OH0.17MF1DByop1lCcnefGB8t3AcS1CGcJvbzunwY3QbK_c";
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const [session, setSession] = useState(null);
  const [rating, setRating] = useState([]);
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
        // console.log(session);
        // console.log(userData);
      }
    };

    fetchUserData();
  }, []);
  useEffect(() => {
    const fetchRatingData = async () => {
      if (userData) {
        const { data, error } = await supabase
          .from("ratings")
          .select("movie_id", "rating")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false }) // Tri par date (du plus récent au plus ancien)
          .limit(1); // Récupère uniquement la première entrée (la plus récente)

        if (error) {
          console.error(
            "Erreur lors de la récupération des notations :",
            error.message
          );
        } else {
          setRating(data.rating);
          setMovie_id(data.movie_id);
        }
      }
      fetchRatingData();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    fetchMovieDetails();
  }, [movie_id]);

  return (
    <div className="rating">
      <h2 style={{ color: "gold" }}>Your Rating</h2>
      <p style={{ color: "white" }}>Most Recently Rated</p>
      {rating && movie ? (
        <div>
          <p>Movie ID: {movie.title}</p>

          <p>Rating: {rating.rating}</p>
        </div>
      ) : (
        <p>No ratings available.</p>
      )}
    </div>
  );
};

export default Userrating;
