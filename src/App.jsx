import { useState } from 'react';
import './App.css';
import MovieList from './MovieList';
import MovieModal from './MovieModal';
import Sidebar from './Sidebar';

// TODO Milestone 3

const App = () => {
  const [modalMovieID, setModalMovieID] = useState(0);
  const [userData, setUserData] = useState({ watched: [], liked: [] });
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleMovieCardClick = (movieId) => { setModalMovieID(movieId) };
  const handleMovieCardWatched = (e, title) => {
    e.stopPropagation();
    if (userData.liked.includes(title)) {
      setUserData({ ...userData, watched: userData.watched.filter(movie => movie != title) });
    } else {
      setUserData({ ...userData, watched: [...userData.watched, title] });
    }
  };
  const handleMovieCardLiked = (e, title) => {
    e.stopPropagation();
    if (userData.liked.includes(title)) {
      setUserData({ ...userData, liked: userData.liked.filter(movie => movie != title) });
    } else {
      setUserData({ ...userData, liked: [...userData.liked, title] });
    }
  };
  const onMovieCardClick = {
    modal: handleMovieCardClick,
    watched: handleMovieCardWatched,
    liked: handleMovieCardLiked,
  }

  return (
    <>
      <header className="App-header">
        <h1>Flixster</h1>
      </header>
      <div className="App">
        <MovieList isSearchActive={isSearchActive} setIsSearchActive={setIsSearchActive} onMovieCardClick={onMovieCardClick} />
        {!isSearchActive && <Sidebar userData={userData} />}
        {Boolean(modalMovieID) && <MovieModal movieID={modalMovieID} onMovieIDChange={setModalMovieID} />}
      </div>
      <footer className="App-header">
        <h1>Flixster</h1>
      </footer>
    </>
  );
}

export default App;