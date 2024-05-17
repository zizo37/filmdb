//import { supabase } from './supabase'; // Importez votre instance Supabase

import React from 'react';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from 'react-router-dom';

function FourthRow(props) {
    const [isAddedToList, setIsAddedToList] = useState(false);

    const [genres, setGenres] = useState([]);
    const [user, setUser] = useState(null);
    const navigate=useNavigate();
    const [companies,setCompanies]=useState([])


    useEffect(() => {
        if (props.data && props.data.Genre) {
          const chaine = props.data.Genre;
          const genresArray = chaine.split(',');
          setGenres(genresArray);
        }
      }, [props.data]);
    


    // if (!props.data || !props.data.Genre) {
    //     // Gérer le cas où props.data ou props.data.Genre est undefined
    //     return <div>Les données ne sont pas définies.</div>;
    //   }
    // console.log(props.data.Genre)
    // const chaine = props.data.Genre;
    // const Genres = chaine.split(',');

    const styleElement = {
        width: '200px',
        height: '100px',
        border: '2px solid white', // Bordure de 2 pixels solide, couleur noire
        // border: '2px solid blue', // Correction de la couleur de la bordure

        borderRadius: '30px', // Rayon de courbure des coins de 10 pixels
        margin:"6px",
        padding:"3px",

      };

      // CSS pour le bouton
    const buttonStyle = {
      position :'relative',
      width: '100%', // Le bouton prendra toute la largeur
      backgroundColor: 'orange', // Couleur de fond orange
      color: 'black', // Texte blanc
      border: 'none', // Pas de bordure
      borderRadius: '5px', // Coins arrondis
      padding: '10px', // Espacement intérieur
      fontSize: '16px', // Taille de la police
      cursor: 'pointer', // Curseur de souris de type pointer
  };
  const parentDivStyle = {
    //display:'flex',
    //border: '2px solid blue', // Bordure rouge de 2 pixels
    marginLeft:'130px',
    height:50,
    marginTop:'90px',

  };
  const plus={
    position:'absolute',
    left:0,
    padding:4

  }
  const supabase = createClient(
    "https://ksnouxckabitqorjucgz.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzbm91eGNrYWJpdHFvcmp1Y2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0MzM4ODgsImV4cCI6MjAzMDAwOTg4OH0.17MF1DByop1lCcnefGB8t3AcS1CGcJvbzunwY3QbK_c"
  );
  // const createTable =async ()=>{
   
   
  
  
  //   const {error}= await supabase.from('watchList').createTable().ifNotExists().addColumn('user_id',{type:'uuid',primaryKey:true})
  //   .addColumn('movie_id',{type:'uuid',primaryKey:true});
  //   if(error){
  //     console.error('Erreur lors de la creation de la table:',error.message);
  //     return;
  //   }
  // };



  useEffect(
    ()=>
      {
        const fetchListMovie = async () => {
          try {
              const { data, error } = await supabase
                  .from('watchlist')
                  .select('*')
                  .eq('user_id', props.userID)
                  .eq('movie_id', props.data.imdbID);
                  //isAddedToList(true);


              if (error) {
                  console.error('Error fetching rating:', error.message);
                  return;
              }
                               //setIsAddedToList(true);
               setIsAddedToList(data.length > 0);

              if (data.length > 0) {
                console.log(data);
              }
          } catch (error) {
              console.error('Error fetching rating:', error.message);
          }
      };
      fetchListMovie();

      }
      ,
      [props.userID,props.data.imdbID]
  )
  
    





  const handelWhatchList = async () => {

    if(props.userID ){
    
      if(!isAddedToList){
        console.log(props.userID);

        // Vérifiez si les données du film sont disponibles
      if (!props.data || !props.data.imdbID) {
        console.error("No movie data available");
        return;
      }

      try {
        //await createTable();
        // Insérez l'ID du film et l'ID de l'utilisateur connecté dans la table de la liste de surveillance de votre base de données Supabase
        const { data, error } = await supabase.from('watchlist').insert([
          { movie_id: props.data.imdbID, user_id: props.userID }
        ]);
        setIsAddedToList(true);


        if (error) {
          console.error("Error adding movie to watch listTT:", error);
          return;

        } else {
          console.log("Movie added to watch list:", data);

          // Réalisez d'autres actions si nécessaire, comme mettre à jour l'interface utilisateur pour refléter l'ajout du film à la liste de surveillance
        }
      } catch (error) {
        console.error("Error adding movie to watch list:", error.message);
      }



      }
      else{
      
          try {
            // Delete the row where user_id and film_id match certain values
            const { data, error } = await supabase
                .from('watchlist')
                .delete()
                .eq('user_id', props.userID) // Match user_id
                .eq('movie_id', props.data.imdbID); // Match film_id
                setIsAddedToList(false);



            if (error) {
                console.error("Error removing movie from watch list:", error.message);
            } else {
                console.log("Movie removed from watch list:", data);
                // Update the UI or perform other actions as needed

            }

        } catch (error) {
            console.error("Error removing movie from watch list:", error.message);
        }

        
      }
  }
  else{
   
      alert("you are not authentified");
      console.log(props.companie.production_companies);

    
  }


  };
  useEffect(
    ()=>{
      console.log(props.companie);
      if (props.companie && props.companie.production_companies) {
        setCompanies(props.companie.production_companies);
      }

      //setCompanies(props.companie.production_companies);
      

    }
    ,
    [props.companie]
  )


  
  
  

  

 
    return (
      <div className="row">
        <div className="col-8" >
          <div className='row'>
            <div style={{color:'white',textDecoration: 'none',margin:"20px",}}  >
                {
                    genres.map(item=><span  style={styleElement}> {item}</span>)

                }
               <p>
                <br></br>
                {props.data.Plot}
               </p>
                
            </div> 
            
            <hr style={{color:'white',textDecoration: 'none',}}  ></hr>   

            <div style={{color:'white',textDecoration: 'none',}} ><span  style={{ textTransform: 'uppercase', fontSize: '1em' }} >Director  </span><span style={{color:'blue',}}> {props.data.Director} </span></div>
            <hr style={{color:'white',textDecoration: 'none',}}  ></hr>   

            <div style={{color:'white',textDecoration: 'none',}} >  <span style={{ textTransform: 'uppercase', fontSize: '1em' }} >Writers   </span><span style={{color:'blue',}}> {props.data.Writer} </span></div>
            <hr style={{color:'white',textDecoration: 'none',}} ></hr>   

            <div style={{color:'white',textDecoration: 'none',}} > <span style={{ textTransform: 'uppercase', fontSize: '1.2em' }} >Start   </span><span style={{color:'blue',}}> {props.data.Actors} </span> </div>
            <hr style={{color:'white',textDecoration: 'none',}} ></hr>   

            <div style={{color:'white',textDecoration: 'none',}} > <span style={{ textTransform: 'uppercase', fontSize: '1.5em' }} >IMDb    </span>Pro See production info  at IMDbPro </div>
            <hr style={{color:'white',textDecoration: 'none',}} ></hr>   

          </div>
        </div>
        <div className="col-3"  style={parentDivStyle}>
        <div >
      {companies &&companies.map((company, index) => (
        // Vérification du logo_path avant de rendre l'image
        company.logo_path ? (
          <img key={index} src={`https://image.tmdb.org/t/p/w500${company.logo_path}`} alt={`Company Logo ${index}`} style={{ width: '100px',
          height: 'auto' ,filter: 'invert(100%) sepia(100%) saturate(10000%) hue-rotate(330deg)',
       margin:"5px",marginBottom:'15px'
      
        }} />
        ) : ""
      ))}
    </div>
          
          <button className="watch-list-button" style={buttonStyle} onClick={()=>{handelWhatchList()}}>
            <FontAwesomeIcon icon={faPlus} style={plus} /> { isAddedToList?"remove from list watch":'add to list watch'
}
          </button>
          <div style={{marginTop:"22px"}} > 

            { props.data.Metascore ==='N/A'? "":(<><span style={{color:'white', padding:'3px',backgroundColor:'orange' }} >{props.data.Metascore}</span><span style={{color:'blue', marginLeft:'12px'}} >Metascore</span></>) }  
  
          </div>
        </div>
      </div>
    );
  }
  export default FourthRow;  