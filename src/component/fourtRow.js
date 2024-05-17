import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from 'react-router-dom';

function FourthRow(props) {
  const supabase = createClient(
    "https://ksnouxckabitqorjucgz.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzbm91eGNrYWJpdHFvcmp1Y2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0MzM4ODgsImV4cCI6MjAzMDAwOTg4OH0.17MF1DByop1lCcnefGB8t3AcS1CGcJvbzunwY3QbK_c"
  );

  const [user, setUser] = useState(null);
  const [isAddedToList, setIsAddedToList] = useState(false);
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user data:", error.message);
      } else {
        console.log(user);
        setUser(user);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    if (props.data && props.data.Genre) {
      const chaine = props.data.Genre;
      const genresArray = chaine.split(',');
      setGenres(genresArray);
    }
  }, [props.data]);

  useEffect(() => {
    const fetchListMovie = async () => {
      try {
        const { data, error } = await supabase
          .from('watchlist')
          .select('*')
          .eq('user_id', user?.id)
          .eq('movie_id', props.data.imdbID);

        if (error) {
          console.error('Error fetching rating:', error.message);
          return;
        }
        setIsAddedToList(data.length > 0);
        if (data.length > 0) {
          console.log(data);
        }
      } catch (error) {
        console.error('Error fetching rating:', error.message);
      }
    };
    if (user && props.data) fetchListMovie();
  }, [user, props.data]);

  const handleWatchList = async () => {
    if (user?.id) {
      if (!isAddedToList) {
        console.log(user.id);
        if (!props.data || !props.data.imdbID) {
          console.error("No movie data available");
          return;
        }
        try {
          const { data, error } = await supabase.from('watchlist').insert([
            { movie_id: props.data.imdbID, user_id: user.id }
          ]);
          setIsAddedToList(true);
          if (error) {
            console.error("Error adding movie to watch list:", error);
            return;
          } else {
            console.log("Movie added to watch list:", data);
          }
        } catch (error) {
          console.error("Error adding movie to watch list:", error.message);
        }
      } else {
        try {
          const { data, error } = await supabase
            .from('watchlist')
            .delete()
            .eq('user_id', user.id)
            .eq('movie_id', props.data.imdbID);
          setIsAddedToList(false);
          if (error) {
            console.error("Error removing movie from watch list:", error.message);
          } else {
            console.log("Movie removed from watch list:", data);
          }
        } catch (error) {
          console.error("Error removing movie from watch list:", error.message);
        }
      }
    } else {
      alert("You are not authenticated");
    }
  };

  useEffect(() => {
    if (props.companie && props.companie.production_companies) {
      setCompanies(props.companie.production_companies);
    }
  }, [props.companie]);

  const handleReviewSubmit = async () => {
    console.log('Review submitted:', reviewText);
    setShowReview(false);
    setReviewText('');
    if (user?.id) {

      if (!props.data || !props.data.imdbID) {
        console.error("No movie data available");
        return;
      }
      try {
        const { data, error } = await supabase.from('reviews').insert([
          { movie_id: props.data.imdbID,review:reviewText, user_id: user.id }
        ]);
        if (error) {
          console.error("Error adding review movie :", error);
          return;
        } else {
          console.log("Movie review added :", data);
        }
      } catch (error) {
        console.error("Error adding review movie :", error.message);
      }

    }
    else{
      alert('you are not authenticated');
    }
  };

  const styleElement = {
    width: '200px',
    height: '100px',
    border: '2px solid white',
    borderRadius: '30px',
    margin: "6px",
    padding: "3px",
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: isAddedToList ? 'red' : 'orange',
    color: 'black',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    textAlign: 'left',
  };

  return (
    <div className="row">
      <div className="col-lg-8 col-md-8 col-sm-12">
        <div className='row'>
          <div style={{ color: 'white', textDecoration: 'none', margin: "20px" }}>
            {genres.map(item => <span style={styleElement} key={item}> {item}</span>)}
            <p>
              <br></br>
              {props.data.Plot}
            </p>
          </div>
          <hr style={{ color: 'white', textDecoration: 'none' }}></hr>
          <div style={{ color: 'white', textDecoration: 'none' }}>
            <span style={{ textTransform: 'uppercase', fontSize: '1em' }}>Director </span><span style={{ color: 'blue' }}> {props.data.Director} </span>
          </div>
          <hr style={{ color: 'white', textDecoration: 'none' }}></hr>
          <div style={{ color: 'white', textDecoration: 'none' }}>
            <span style={{ textTransform: 'uppercase', fontSize: '1em' }}>Writers </span><span style={{ color: 'blue' }}> {props.data.Writer} </span>
          </div>
          <hr style={{ color: 'white', textDecoration: 'none' }}></hr>
          <div style={{ color: 'white', textDecoration: 'none' }}>
            <span style={{ textTransform: 'uppercase', fontSize: '1.2em' }}>Stars </span><span style={{ color: 'blue' }}> {props.data.Actors} </span>
          </div>
          <hr style={{ color: 'white', textDecoration: 'none' }}></hr>
          <div style={{ color: 'white', textDecoration: 'none' }}>
            <span style={{ textTransform: 'uppercase', fontSize: '1.5em' }}>IMDb </span>Pro See production info at IMDbPro
          </div>
          <hr style={{ color: 'white', textDecoration: 'none' }}></hr>
        </div>
      </div>
      <div className="col-lg-3 col-md-3 col-sm-12" style={{ marginLeft: 'auto', marginTop: '90px' }}>
        <div>
          {companies && companies.map((company, index) => (
            company.logo_path ? (
              <img key={index} src={`https://image.tmdb.org/t/p/w500${company.logo_path}`} alt={`Company Logo ${index}`} style={{
                width: '100px',
                height: 'auto',
                filter: 'invert(100%) sepia(100%) saturate(10000%) hue-rotate(330deg)',
                margin: "5px",
                marginBottom: '15px'
              }} />
            ) : null
          ))}
        </div>
        <button className="watch-list-button" style={buttonStyle} onClick={handleWatchList}>
          <FontAwesomeIcon icon={isAddedToList ? faMinus : faPlus} /> {isAddedToList ? "Remove from watch list" : 'Add to watch list'}
        </button>
        <div style={{ marginTop: "22px" }}>
          {props.data.Metascore !== 'N/A' && (
            <>
              <span style={{ color: 'white', padding: '3px', backgroundColor: 'orange' }}>{props.data.Metascore}</span>
              <span style={{ color: 'blue', marginLeft: '12px' }}>Metascore</span>
            </>
          )}
        </div>
        <button style={{ ...buttonStyle, marginTop: '20px' }} onClick={() => setShowReview(true)}>
          Leave a Review
        </button>
        {showReview && (
          <div style={{ marginTop: '20px', color: 'white' }}>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
              rows="4"
              style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
            />
            <button style={{ ...buttonStyle, marginTop: '10px' }} onClick={handleReviewSubmit}>
              Submit Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FourthRow;
