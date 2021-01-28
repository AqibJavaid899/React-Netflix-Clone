import React from "react";
import "./App.css";
import genreURL from "./requests";
import Row from "./Row";
import Banner from "./Banner";
import NavBar from "./NavBar";

function App() {
  return (
    <div className="app">
      {/* NavBar Component */}
      <NavBar />

      {/* Banner Component */}
      <Banner />

      {/* Building Row for the Netflix Page */}
      <Row
        fetchURL={genreURL.fetchNetflixOriginals}
        title="NETFLIX ORIGINALS"
        isLarge
      />
      <Row fetchURL={genreURL.fetchTrending} title="Trending Now" />
      <Row fetchURL={genreURL.fetchHistoryMovies} title="Top Rated" />
      <Row fetchURL={genreURL.fetchAnimationMovies} title="Animation Movies" />
      <Row fetchURL={genreURL.fetchFantasyMovies} title="Fantasy Movies" />
      <Row fetchURL={genreURL.fetchRomanceMovies} title="Romance Movies" />
      <Row fetchURL={genreURL.fetchSciFiMovies} title="SciFi Movies" />
    </div>
  );
}

export default App;
