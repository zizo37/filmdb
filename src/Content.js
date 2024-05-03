import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Apidata from "./components/navbar/Apidata";
const movies = Apidata();
function Content() {
  return (
    <>
      <Header />
      <div className="container">
        <div>
          {movies.map((movie) => {
            return (
              <>
                <h1>{movie.title}</h1>
                <p>
                  {movie.PublishYear} - {movies.durree}
                </p>
                <p>
                  FilmDB Rating rate <span>YOUR RATING</span>
                </p>

                <div>
                  <img src={movie.image} alt={movie.title} />
                </div>
                <div>
                  <p>{movie.genre}</p>
                  <p>{movie.resume}</p>
                  <th />
                  <p>{movie.Director} </p>
                  <th />
                  <p>{movie.Writers}</p>
                  <th />
                  <p>{movies.Stars} </p>
                  <th />
                </div>
              </>
            );
          })}

          <a href="#">
            See production info at IMDBPro <icon></icon>
          </a>
        </div>
        <div></div>
      </div>
      <Footer />
    </>
  );
}

export default Content;
