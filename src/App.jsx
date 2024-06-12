import { useState } from 'react';
import './App.css';
import MovieList from './MovieList';
import MovieModal from './MovieModal';

// TODO Milestone 3

const App = () => {
  const [modalMovieID, setModalMovieID] = useState(0);

  const handleMovieClick = (e, movieId) => {
    // TODO apply Martin's feedback on Project 1 re: event handlers
    if (e.target.name === "like") {
      console.log("like", movieId);
    } else if (e.target.name === "watched") {
      console.log("watched", movieId);
    } else {
      setModalMovieID(movieId);
      console.log("modal", movieId);
    }
  };

  return (
    <>
      <header className="App-header">
        <h1>Flixster</h1>
      </header>
      <div className="App">
        <MovieList onMovieClick={handleMovieClick} />
        {Boolean(modalMovieID) && <MovieModal movieID={modalMovieID} onMovieIDChange={setModalMovieID} />}
      </div>
      <footer className="App-header">
        <h1>Flixster</h1>
      </footer>
    </>
  );
}

export default App;