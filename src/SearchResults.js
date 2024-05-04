

import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import './SearchResults.css';
import Header from './Header';

const SearchResults = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('q');

    useEffect(() => {
        const fetchSearchResults = async () => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzI3N2U4NzIyNjA4YTNjOGU1YWNjZmQ0ZTVmZDk0ZSIsInN1YiI6IjY2MTVkMjg2YWM0MTYxMDE3YzkyOTlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SCbzx_EgdSfu_R2NVoQ8pGKqwIFfm8tXz-yd3HoLJX8',
                },
            };

            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&language=en-US`,
                    options
                );
                const data = await response.json();
                setSearchResults(data.results || []);
            } catch (error) {
                console.error(error);
            }
        };

        if (searchTerm) {
            fetchSearchResults();
        }
    }, [searchTerm]);

    return (
        <>
            <Header />
            <div className="container-fluid bg-dark text-light py-4">
                <h1 className="text-center mb-4">Search Results for "{searchTerm}"</h1>
                <div className="row justify-content-center">
                    {searchResults.map((result, index) => {
                        const title = result.title;
                        const imageUrl = `https://image.tmdb.org/t/p/w500/${result.poster_path}`;
                        const id = result.id;

                        return (
                            <div className="col-md-4 mb-4" key={index}>
                                <div className="card bg-dark text-light h-100">
                                    {result.poster_path && (
                                        <img
                                            src={imageUrl}
                                            className="card-img-top"
                                            alt={title}
                                            style={{ objectFit: 'cover', height: '300px', width: '100%' }}
                                        />
                                    )}
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{title}</h5>
                                        <Link to={`/apidata/${id}`} className="btn btn-primary">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default SearchResults;