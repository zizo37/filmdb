import { createClient } from "@supabase/supabase-js";
// import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserReview = () => {
  const supabaseUrl = "https://ksnouxckabitqorjucgz.supabase.com";
  const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzbm91eGNrYWJpdHFvcmp1Y2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0MzM4ODgsImV4cCI6MjAzMDAwOTg4OH0.17MF1DByop1lCcnefGB8t3AcS1CGcJvbzunwY3QbK_c";
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const [session, setSession] = useState(null);
  const [review, setReview] = useState([]);
  const [userData, setUserData] = useState(null);

  const [movie, setMovie] = useState([]);
  const [movies, setMovies] = useState([]);

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
    const fetchRatingData = async () => {
      if (userData) {
        const { data, error } = await supabase
          .from("reviews")
          .select("*")
          .eq("user_id", session.user.id);
        // .order("created_at", { ascending: false }) // Tri par date (du plus récent au plus ancien)
        // .limit(1); // Récupère uniquement la première entrée (la plus récente)

        if (error) {
          console.error(
            "Erreur lors de la récupération des notations :",
            error.message
          );
        } else {
          setMovies((prevmovie) => [...prevmovie, data]);
          console.log(movies);
        }
      }
    };
    fetchRatingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);
  const fetchMovieDetails = async (movieId) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/find/${movieId}?api_key=b2efe9b0108d8645f514bc9b0363d199&external_source=imdb_id`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response.movie_results);
        setMovie(response.movie_results);
        console.log(movie);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const fetchMovies = async () => {
      for (const item of movies) {
        for (const i of item) {
          await fetchMovieDetails(i.movie_id);
          setReview(i.review);
          console.log(i.movie_id);
        }
        console.log(item);
      }
      console.log(review);
    };

    fetchMovies();
    setMovies([]);
  }, []);
  const navigate = useNavigate();

  const handleMovieClick = () => {
    navigate(`/movie/${movie.movie_id}`);
  };
  return (
    <div className="rating">
      <h2 style={{ color: "gold" }}>Your Reviews</h2>
      <p style={{ color: "white" }}>Most Recently Review</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px",
        }}
      >
        {review ? (
          <div>
            {movie.map((item) => (
              <div
                onClick={handleMovieClick}
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "5px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                  margin: "10px",
                  width: "100%",
                  height: "200px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                className="movie_card"
                key={item.movie_id}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                  style={{ width: "150px", height: "150px" }}
                  alt={item.title}
                />
                <div>
                  <h3
                    style={{
                      fontSize: "20px",
                      margin: "10px auto",
                      fontWeight: "bold",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p> Review: {review}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No movie has review. Add review to see it</div>
        )}
      </div>
    </div>
  );
};

export default UserReview;
