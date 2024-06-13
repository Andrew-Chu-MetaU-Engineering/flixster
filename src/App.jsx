import { useState } from 'react';
import './App.css';
import MovieList from './MovieList';
import MovieModal from './MovieModal';

// TODO Milestone 3

const App = () => {
  const [modalMovieID, setModalMovieID] = useState(0);
  const [userData, setUserData] = useState({ watched: [], liked: [] });

  const handleMovieCardClick = (movieId) => { setModalMovieID(movieId) };
  const handleMovieCardWatched = (e, title) => {
    setUserData({ ...userData, watched: [...userData.watched, title] });
    e.stopPropagation();
    console.log(userData);
  };
  const handleMovieCardLiked = (e, title) => {
    setUserData({ ...userData, liked: [...userData.liked , title] });
    e.stopPropagation();
    console.log(userData);
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
        <MovieList onMovieCardClick={onMovieCardClick} />
        {Boolean(modalMovieID) && <MovieModal movieID={modalMovieID} onMovieIDChange={setModalMovieID} />}
      </div>
      <footer className="App-header">
        <h1>Flixster</h1>
      </footer>
    </>
  );
}

export default App;