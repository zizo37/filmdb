//import React from 'react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaImage, FaPlayCircle } from 'react-icons/fa';


import 'bootstrap/dist/css/bootstrap.min.css';

function ThirdRow(props) {
    const [urlYoutybe, setUrlYoutybe] = useState([]);

    const [trailers, setTrailers] = useState([]);
    //const [imdbID,setImdbid]=useState();
    const handleVideoIconClick = () => {
    console.log('Clic sur l\'icône de vidéo');
  };

  const handlePhotoIconClick = () => {
    console.log('Clic sur l\'icône de photo');
  };

  //setImdbid(props.data.imdbID)

  useEffect(() => {
    const fetchTrailers = async (imdbID) => {
        try {
            const CLE_API = '880b11492d4a71ac2ef24540943511d3';

            // Requête à l'API TMDb pour obtenir les détails du film
            const tmdbResponse = await axios.get(`https://api.themoviedb.org/3/find/${imdbID}?api_key=${CLE_API}&external_source=imdb_id`);
            
            // Récupération de l'ID TMDb du film
            const tmdbID = tmdbResponse.data.movie_results[0].id;

            // Requête à l'API TMDb pour obtenir les vidéos (trailers) associées au film
            const videosResponse = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbID}/videos?api_key=${CLE_API}`);

            // Récupération des trailers du film
            const trailers = videosResponse.data.results.filter(video => video.type === 'Trailer');
            
            // Mise à jour de l'état avec les trailers récupérés
            setTrailers(trailers);
                console.log(trailers);
                setUrlYoutybe(`https://www.youtube.com/embed/${trailers[0].key}`);
                console.log(`https://www.youtube.com/embed/${trailers[0].key}`);



        } catch (error) {
            console.error('Erreur lors de la récupération des trailers:', error);
        }
    };

    // Appel de la fonction de récupération des trailers avec l'ID IMDb du film
    const imdbID = props.data.imdbID;
    fetchTrailers(imdbID);
    //console.log(trailers);
}, [props.data.imdbID]); // Le tableau vide signifie que ce useEffect ne s'exécute qu'une fois au chargement du composant




    const squareIconStyle = {
      display: 'inline-block',
      width: '50px',
      height: '50px',
      backgroundColor: 'gray',
      borderRadius: '4px',
    };
    const stle={

        boredr:'solide 2px white',
        backgroundColor:'yellow',

        height: "500px", /* Hauteur arbitraire pour l'exemple */
        // background-color, lightgray;
        position: "relative", /* Assurez-vous que le positionnement fonctionne correctement */
    }
    const squareDivStyle = {
        width: '150px',
        height: '200px',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin:"6px"
      };
    //   const enfant={
    //     position: 'absolute',
    //     top: "0",
    //     bottom: "0",
    //     left: "0",
    //     right: "0",
    //     // background-color: 'lightblue',
    //     width: '100%';
    //     height: 100%;
    //   }
    

  return (
    <div className="row  "style={{justifyContent:''} }>
      <div className="col-3 m-1 conteneur-parent d-flex justify-content-center align-items-center "  >
        {/* Colonne contenant la photo du film */}
        <img src={props.data.Poster} alt="Poster du film" className="img-fluid " />
      </div>
      <div className="col-lg-6  m-1"        
 >
        {/* Colonne contenant le trailer du film */}
        <iframe
          width="100%"
          height="100%"
          src={urlYoutybe}
          title="Trailer du film"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="col-2 m-1  justify-content-center align-items-center  "style={{height:"100%"}}   >
        {/* Colonne contenant les icônes de vidéo et de photo */}

        <div className="row" >
          <div className="col mx-2 "  style={squareDivStyle} >
            {/* Première ligne avec l'icône de vidéo */}
           
            <div>
                <FaImage size={25}  squareIconStyle />
                <span>Afficher l'image</span>
            </div>

          </div>
        </div>


        <div className="row" >
          <div className="col mx-2 "style={squareDivStyle}   >
            {/* Deuxième ligne avec l'icône de photo */}
            <div>
                <FaPlayCircle size={25} squareIconStyle  style={{height:"50%"}}  />
                <span>Lire la vidéo</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ThirdRow;