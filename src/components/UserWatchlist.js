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
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState([]);
  const [moviesreview, setMoviesReview] = useState([]);
  const [moviesrating, setMoviesRating] = useState([]);
  const [movierating, setMovieRating] = useState([]);
  const [moviereview, setMovieReview] = useState([]);

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
  useEffect(() => {
    const fetchReviewgData = async () => {
      if (session) {
        const { data, error } = await supabase
          .from("reviews")
          .select("*")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false }) // Tri par date (du plus récent au plus ancien)
          .limit(1); // Récupère uniquement la première entrée (la plus récente)

        if (error) {
          console.error(
            "Erreur lors de la récupération des notations :",
            error.message
          );
        } else {
          // console.log(data);
          setMoviesReview((prevmovie) => [...prevmovie, data]);
          // console.log(moviesreview);
        }
      }
    };
    fetchReviewgData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);
  useEffect(() => {
    const fetchRatingData = async () => {
      if (session) {
        const { data, error } = await supabase
          .from("ratings")
          .select("*")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false }) // Tri par date (du plus récent au plus ancien)
          .limit(1); // Récupère uniquement la première entrée (la plus récente)

        if (error) {
          console.error(
            "Erreur lors de la récupération des notations :",
            error.message
          );
        } else {
          // console.log(data);
          setMoviesRating((prevmovie) => [...prevmovie, data]);
          // console.log(moviesrating);
        }
      }
    };
    fetchRatingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const fetchReviewMovieDetails = async (movieId) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer b2efe9b0108d8645f514bc9b0363d199",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/find/${movieId}?api_key=b2efe9b0108d8645f514bc9b0363d199&external_source=imdb_id`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response.movie_results);
        setMovieReview(response.movie_results);
        // console.log(moviereview);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const fetchMoviesReview = async () => {
      for (const item of moviesreview) {
        for (const i of item) {
          await fetchReviewMovieDetails(i.movie_id);
          setReview(i.review);
          // console.log(i.movie_id);
        }
        // console.log(item);
      }
      // console.log(review);
    };

    fetchMoviesReview();
    setMoviesReview([]);
  }, [review]);
  // useEffect(() => {
  //   const fetchMoviesReview = async () => {
  //     for (const item of moviesreview) {
  //       for (const i of item) {
  //         const reviewData = await fetchReviewMovieDetails(i.movie_id);
  //         setReview((prevReview) => [...prevReview, reviewData]);
  //       }
  //     }
  //   };

  //   fetchMoviesReview();
  //   setMoviesReview([]);
  // }, []);
  const fetchRatingMovieDetails = async (movieId) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer b2efe9b0108d8645f514bc9b0363d199",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/find/${movieId}?api_key=b2efe9b0108d8645f514bc9b0363d199&external_source=imdb_id`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response.movie_results);
        setMovieRating(response.movie_results);
        // setMovieReview()
        console.log(movierating);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const fetchMoviesRting = async () => {
      for (const item of moviesrating) {
        for (const i of item) {
          await fetchRatingMovieDetails(i.movie_id);
          setRating(i.rating);
          // console.log(i.movie_id);
        }
        // console.log(item);
      }
      // console.log(rating);
    };

    fetchMoviesRting();
    setMoviesRating([]);
  }, [rating]);
  // useEffect(() => {
  //   const fetchMoviesRating = async () => {
  //     for (const item of moviesrating) {
  //       for (const i of item) {
  //         const ratingData = await fetchRatingMovieDetails(i.movie_id);
  //         setRating((prevRating) => [...prevRating, ratingData]);
  //       }
  //     }
  //   };

  //   fetchMoviesRating();
  //   setMoviesRating([]);
  // }, []);
  const navigate = useNavigate();

  const handleMovieClickReview = () => {
    navigate(`/movie/${moviereview.movie_id}`);
  };

  const handleMovieClickRating = () => {
    navigate(`/movie/${movierating.movie_id}`);
  };
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
          <div className="rating">
            <h2 style={{ color: "gold" }}>Your Rating</h2>
            <p style={{ color: "white" }}>Most Recently Rated</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "10px",
              }}
            >
              {movierating ? (
                <div>
                  {movierating.map((item) => (
                    <div
                      key={item.imdb_id}
                      onClick={handleMovieClickRating}
                      style={{
                        backgroundColor: "#000",
                        color: "#fff",
                        padding: "10px",
                        borderRadius: "5px",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                        margin: "10px",
                        width: "250px",
                        height: "350px",
                        textAlign: "center",
                      }}
                      className="movie_card"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                        style={{ width: "200px", height: "200px" }}
                        alt={item.title}
                      />
                      <h3 style={{ fontSize: "20px", margin: "10px auto" }}>
                        {item.title}
                      </h3>
                      <p> Rating {rating}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  No movie has rated
                  {/* <p>You rating {rating}</p> */}
                </div>
              )}
            </div>
          </div>
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
              {moviereview && review ? (
                <div>
                  {moviereview.map((item) => (
                    <div
                      onClick={handleMovieClickReview}
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
                        <p>Review:{review}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>No movie has review. Add review to see it</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWatchlist;
