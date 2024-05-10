import React from 'react';
import { useParams } from 'react-router-dom';



function Movie() {
  const { id } = useParams();

    return (
      <div style={{color: 'white'}}>       
        This is MoviePage id: {id}
      </div>

    );
  }
  
  export default Movie;
  