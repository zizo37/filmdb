import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { createClient } from "@supabase/supabase-js";
import RatingPopup from './RatingPopup';

function SecondRow(props) {
    const [user, setUser] = useState(null);
    const [filled, setFilled] = useState(false);
    const [rating, setRating] = useState(null);
    const supabase = createClient(
        "https://ksnouxckabitqorjucgz.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzbm91eGNrYWJpdHFvcmp1Y2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0MzM4ODgsImV4cCI6MjAzMDAwOTg4OH0.17MF1DByop1lCcnefGB8t3AcS1CGcJvbzunwY3QbK_c"
    );

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
        if (props.data.Ratings && props.data.Ratings.length > 0) {
            setRating(props.data.Ratings[0].Value);
        }
    }, [props.data.Ratings]);

    useEffect(() => {
        // Vérifiez si l'utilisateur a déjà évalué ce film lorsqu'il charge la page
        const fetchRating = async () => {
            try {
                const { data, error } = await supabase
                    .from('ratings')
                    .select('rating')
                    .eq('user_id', user.id)
                    .eq('movie_id', props.data.imdbID);

                if (error) {
                    console.error('Error fetching rating:', error.message);
                    return;
                }

                if (data.length > 0) {
                    setFilled(true);
                    setRating(data[0].rating);
                }
            } catch (error) {
                console.error('Error fetching rating:', error.message);
            }
        };

        fetchRating();
    }, [user, props.data.imdbID]);

    const handleRateClick = async (rating) => {
        if (!filled) {
            try {
                // Stockez le rating de l'utilisateur dans la base de données Supabase
                const { data, error } = await supabase
                    .from('ratings')
                    .insert([{ movie_id: props.data.imdbID, rating, user_id: user.id }]);

                if (error) {
                    console.error('Error adding rating:', error.message);
                    return;
                }

                setFilled(true);
                setRating(rating); // Mettez à jour le rating affiché
            } catch (error) {
                console.error('Error adding rating:', error.message);
            }
        } else {
            try {
                // Supprimez le rating de l'utilisateur de la base de données Supabase
                const { data, error } = await supabase
                    .from('ratings')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('movie_id', props.data.imdbID);

                if (error) {
                    console.error('Error deleting rating:', error.message);
                    return;
                }

                setFilled(false);
                setRating(null); // Mettez à jour le rating affiché
            } catch (error) {
                console.error('Error deleting rating:', error.message);
            }
        }
    };

    return (
        <div className="row">
            <div className="col-lg-8">
                <h3 style={{ color: 'white' }}>{props.data.Title}</h3>
                <div style={{ color: 'white' }}>
                    {props.data.Year} . {props.data.Rated} . {props.data.Runtime}
                </div>
            </div>
            <div className="col-lg-4 d-flex align-items-center" style={{ color: 'white' }}>
                <div className='col-6'>
                    <ul style={{ listStyleType: "none" }}>
                        <li>Rating filmDB</li>
                        <li>
                            <span style={{ fontSize: '24px' }}>
                                <FaStar
                                    color={true ? 'orange' : 'grey'}
                                    style={{ cursor: 'pointer' }}
                                />
                            </span>
                            {rating}
                        </li>
                        <li></li>
                    </ul>
                </div>
                <div className="col-6">
                    <ul style={{ listStyleType: "none" }}>
                        <li>YOUR RATING</li>
                        <li>
                            <span onClick={() => handleRateClick(10)}>
                                {filled ? (
                                    <FaStar style={{ color: 'orange', fontSize: '24px' }} />
                                ) : (
                                    <FaStar style={{ color: 'grey', fontSize: '24px' }} />
                                )}
                            </span>
                            <RatingPopup onRate={handleRateClick} />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SecondRow;