// import React, { useEffect, useState } from "react";
// import axios from "axios";
// const Search = () => {
//   const [title, setTitle] = useState("");

//   useEffect(() => {
//     axios
//       .get(`https://www.imdb.com/find/${title}`)
//       .then((response) => {
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [title]);
//   function handleSubmit(e) {
//     e.preventDefault();
//   }
//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Search you movie name"
//           onChange={(e) => setTitle(e.target.value)}
//         />
//       </form>
//       <p>{title}</p>
//     </div>
//   );
// };

// export default Search;

import React, { useState } from "react";
import Apidata from "./Apidata";
const Search = () => {
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search your movie name"
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>
      <Apidata title={title} />
    </div>
  );
};

export default Search;
