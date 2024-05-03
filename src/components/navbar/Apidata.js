import { useEffect, useState } from "react";
import axios from "axios";

const Apidata = ({ title }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    if (title) {
      async function getData() {
        const options = {
          method: "GET",
          url: `https://imdb146.p.rapidapi.com/v1/name/${title}`,
          params: { id: "nm0000093" },
          headers: {
            "X-RapidAPI-Key":
              "33c7c58769msh5a55f15b43ecdf6p13135djsna060deb8b7cc",
            "X-RapidAPI-Host": "imdb146.p.rapidapi.com",
          },
        };

        try {
          const response = await axios.request(options);

          setMovies(response.data);
        } catch (error) {
          console.error(error);
        }
      }
      getData();
    }
  }, [title]);
  return movies;
};

export default Apidata;
