import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseURL = "https://image.tmdb.org/t/p/original/";

const Row = (props) => {
  const [movies, setMovies] = useState([]);
  const [trailerId, setTrailerId] = useState("");

  // Calling the TMDB to fetch all the movies related to specific genre
  useEffect(() => {
    const movieFetch = async () => {
      const data = await axios.get(props.fetchURL);
      setMovies(data.data.results);
      return data;
    };
    movieFetch();
  }, [props.fetchURL]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleMovieClick = (movie) => {
    // IF trailer is already playing then clicking it on the thumbnail will close the trailer
    if (trailerId) {
      console.log("Emptying the setTrailer!!");
      setTrailerId("");
    } else {
      /*function 'movieTrailer()' will search the trailer of the 
        movie/series by name on the Youtube */
      movieTrailer(movie?.name || movie?.title || "")
        .then((url) => {
          console.log("URL is ", url);
          console.log(typeof trailerId);

          // https://www.youtube.com/watch?v=D6or2gdrHRE
          const urlParams = new URLSearchParams(new URL(url).search);

          // .get() will search for any string after the '?' in the trailer URL
          const id = urlParams.get("v"); // Here (v=D6or2gdrHRE) so it returns 'D6or2gdrHRE'
          setTrailerId(urlParams.get("v"));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="row">
      <h1>{props.title}</h1>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            /* Run the handleMovieClick when 
                   the user clicks on the movie thumbnail*/
            onClick={() => handleMovieClick(movie)}
            className={`row__poster ${props.isLarge && "row__posterLarge"}`}
            src={`${baseURL}${
              props.isLarge ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>

      {/* It is compulsory here to wrap the upper <DIVs> here in order to
         show the Video of Trailer otherwise only Audio of Trailer will show up */}

      <div>
        {/* videoId only take the trialer ID not the URL */}
        {/* setTrialerID will make sure that the Youtube trailer will 
              only run (if the trailer is already not running) */}
        {trailerId && <Youtube videoId={trailerId} opts={opts} />}
      </div>
    </div>
  );
};

export default Row;
