import React, { useState, useEffect } from "react";
import "./NavBar.css";

const NavBar = () => {
  const [showBG, setShowBG] = useState(false);

  // Event Listener attached to the scrolling of the current window
  useEffect(() => {
    window.addEventListener("scroll", () => {
      // If scroll of window vertically greater than 100 : then change the background to BLACK
      if (window.scrollY > 100) {
        setShowBG(true);
      } else {
        setShowBG(false);
      }
    });
    // Removing the already used Event just not to stack the many listeners on top of one another
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${showBG && "nav__blackBG"}`}>
      <img
        className="nav__netflixLogo"
        src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
        alt="Netflix Logo"
      />

      <img
        className="nav__netflixAvatar"
        src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
        alt="Netflix Avatar"
      />
    </div>
  );
};

export default NavBar;
