import { useState } from "react";

import MovieDisplayBody from "./MovieDisplayBody";
import MovieModal from "./MovieModal";
import Sidebar from "./Sidebar";
import "./App.css";

import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

const App = () => {
  const [modalMovieID, setModalMovieID] = useState(0);
  const [userData, setUserData] = useState({ watched: [], liked: [] });
  const [isSearchActive, setIsSearchActive] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setDrawerOpen(newOpen);
  };

  const handleMovieCardClick = (movieId) => {
    setModalMovieID(movieId);
  };
  const handleMovieCardWatched = (e, title) => {
    e.stopPropagation();
    if (userData.watched.includes(title)) {
      setUserData({
        ...userData,
        watched: userData.watched.filter((movie) => movie != title),
      });
    } else {
      setUserData({ ...userData, watched: [...userData.watched, title] });
    }
  };
  const handleMovieCardLiked = (e, title) => {
    e.stopPropagation();
    if (userData.liked.includes(title)) {
      setUserData({
        ...userData,
        liked: userData.liked.filter((movie) => movie != title),
      });
    } else {
      setUserData({ ...userData, liked: [...userData.liked, title] });
    }
  };

  return (
    <div id="page-container">
      <header>
        <h1>Flixster</h1>
        <Button
          onClick={toggleDrawer(true)}
          variant="contained"
          className="user-movies"
        >
          Your Movies
        </Button>
        <Drawer open={drawerOpen} onClose={toggleDrawer(false)} anchor="right">
          <Sidebar userData={userData} />
        </Drawer>
      </header>
      <section id="content-wrap">
        <span id="movie-body">
          <MovieDisplayBody
            isSearchActive={isSearchActive}
            setIsSearchActive={setIsSearchActive}
            userData={userData}
            handleMovieCardClick={handleMovieCardClick}
            handleMovieCardWatched={handleMovieCardWatched}
            handleMovieCardLiked={handleMovieCardLiked}
          />
        </span>
        {Boolean(modalMovieID) && (
          <MovieModal
            movieID={modalMovieID}
            onMovieIDChange={setModalMovieID}
          />
        )}
      </section>
      <footer>
        <div>
          <h2>Flixster</h2>
          <h3>The movie discovery site.</h3>
        </div>
        <div id="footer-info">
          <h3>About</h3>
          <h4>
            Founded 0 years ago, Flixster provides information about any and all
            movies to over 1 user.
          </h4>
          <h3>Contact</h3>
          <h4>andrewchu@flixster.org</h4>
        </div>
      </footer>
    </div>
  );
};

export default App;
