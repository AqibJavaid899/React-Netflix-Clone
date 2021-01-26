import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

const Banner = () => {
  const [bannerMovie, setBannerMovie] = useState([]);

  // Fetching Random Movie from the Netflix Original category
  useEffect(() => {
    const fetchRandomMovie = async () => {
      const movie = await axios.get(requests.fetchNetflixOriginals);

      // Setting the Random Movie to be equal to bannerMovie
      setBannerMovie(
        movie.data.results[
          Math.floor(Math.random() * movie.data.results.length - 1)
        ]
      );
      return movie;
    };
    fetchRandomMovie();
  }, []);

  const truncate = (str, range) => {
    return str?.length > range ? str.substr(0, range - 1) + "..." : str;
  };

  return (
    <header
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${bannerMovie?.backdrop_path}"
        )`,
        backgroundPosition: "center center",
      }}
      className="banner"
    >
      <div className="banner__contents">
        {/* Banner Title */}
        <div className="banner__title">
          <h1>
            {bannerMovie?.title ||
              bannerMovie?.original_name ||
              bannerMovie?.name}
          </h1>
        </div>

        {/* Banner Buttons */}
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>

        {/* Banner Description */}
        <div className="banner__description">
          {truncate(bannerMovie?.overview, 150)}
        </div>
      </div>

      {/* Fading the Bottom of the Banner Image */}
      <div className="banner--fadeBottom"></div>
    </header>
  );
};

export default Banner;
