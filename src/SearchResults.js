// import React, { useEffect, useState } from 'react'; 
// import axios from 'axios';
// import { useSearchParams, Link } from 'react-router-dom';
// import Header from './Header';

// const SearchResults = () => {
//     const [searchResults, setSearchResults] = useState([]);
//     const [searchParams] = useSearchParams();
//     const searchTerm = searchParams.get('q');

//     useEffect(() => {
//         const fetchSearchResults = async () => {
//             const options = {
//                 method: 'GET',
//                 url: 'https://imdb8.p.rapidapi.com/auto-complete',
//                 params: {
//                     q: searchTerm,
//                 },
//                 headers: {
//                     'X-RapidAPI-Key': 'ba3332dac0msh515089fda960f3dp14f830jsnc01ba0e1578f',
//                     'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
//                 },
//             };

//             try {
//                 const response = await axios.request(options);
//                 setSearchResults(response.data.d || []);
//                 console.log(response.data.d);
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         if (searchTerm) {
//             fetchSearchResults();
//         }
//     }, [searchTerm]);

//     return (
//         <>
//             <Header />
//             <div className="container-fluid bg-dark text-light py-4">
//                 <h1 className="text-center mb-4">Search Results for "{searchTerm}"</h1>
//                 <div className="row">
//                     {searchResults.map((result, index) => {
//                         const title = result.l;
//                         const imageUrl = result.i?.imageUrl;
//                         const id = result.id; // Get the ID from the search result

//                         return (
//                             <div className="col-md-4 mb-4" key={index}>
//                                 <div className="card bg-dark text-light border border-light">
//                                     <div className="card-body p-0">
//                                         {imageUrl && (
//                                             <img
//                                                 src={imageUrl}
//                                                 className="card-img-top"
//                                                 alt={title}
//                                                 style={{ objectFit: 'contain', height: '300px', width: '100%' }}
//                                             />
//                                         )}
//                                         <div className="card-title p-3">
//                                             <h5 className="card-title" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{title}</h5>
//                                             <Link to={`/apidata/${id}`} className="btn btn-primary">
//                                                 View Details
//                                             </Link>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default SearchResults;


import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { useSearchParams, Link } from 'react-router-dom';
import Header from './Header';

const SearchResults = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('q');

    useEffect(() => {
        const fetchSearchResults = async () => {
            const options = {
                method: 'GET',
                url: 'https://imdb8.p.rapidapi.com/auto-complete',
                params: {
                    q: searchTerm,
                },
                headers: {
                    'X-RapidAPI-Key': 'ba3332dac0msh515089fda960f3dp14f830jsnc01ba0e1578f',
                    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
                },
            };

            try {
                const response = await axios.request(options);
                setSearchResults(response.data.d || []);
                console.log(response.data.d);
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
                <div className="row">
                    {searchResults.map((result, index) => {
                        const title = result.l;
                        const imageUrl = result.i?.imageUrl;
                        const id = result.id; // Get the ID from the search result

                        return (
                            <div className="col-md-4 mb-4" key={index}>
                                <div className="card bg-dark text-light border border-light">
                                    <div className="card-body p-0">
                                        {imageUrl && (
                                            <img
                                                src={imageUrl}
                                                className="card-img-top"
                                                alt={title}
                                                style={{ objectFit: 'cover', height: '400px' }}
                                            />
                                        )}
                                        <div className="card-title p-3">
                                            <h5 className="card-title" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{title}</h5>
                                            <Link to={`/apidata/${id}`} className="btn btn-primary">
                                                View Details
                                            </Link>
                                        </div>
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
