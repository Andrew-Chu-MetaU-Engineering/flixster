import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./MovieModal.css";

function MovieModal({ movieID, onMovieIDChange }) {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
    };

    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieID}?language=en-US&append_to_response=videos`,
          options
        );
        const data = await response.json();
        if (!data) {
          throw new Error("Failed to fetch TMDB data.");
        }
        setMovieDetails(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [movieID]);

  function processMovieDetails(details) {
    const runtimeStr =
      details.runtime > 59
        ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m`
        : `${details.runtime % 60}m`;
    const releaseDateStr = new Date(details.release_date).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
    const genresStr = details.genres.map((genre) => genre.name).join(", ");
    const videos = details.videos.results;
    const trailers = videos
      ? videos.filter(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        )
      : [];
    const trailer = trailers ? trailers[trailers.length - 1] : null;

    return (
      <article id="movie-details">
        <div id="poster-panel">
            <img
              src={details.poster_path ? `https://image.tmdb.org/t/p/w780${details.poster_path}` : "https://critics.io/img/movies/poster-placeholder.png"}
              alt={details.title + "Poster"}
              id="poster"
            />
        </div>
        <article id="info-wrapper">
          <h2 id="title">{details.title}</h2>
          <div id="stats">
            <h5>Runtime: {runtimeStr}</h5>
            {details.release_date && <h5>Released on {releaseDateStr}</h5>}
            {genresStr && <h5>Genre: {genresStr}</h5>}
            <p>{details.overview}</p>
          </div>
          <div id="trailer-panel">
            {trailer && (
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                allowFullScreen
              />
            )}
          </div>
        </article>
      </article>
    );
  }

  let backgroundImage =
    movieDetails && movieDetails.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`
      : null;

  return (
    <article id="modal-overlay">
      <div id="modal-content">
        {backgroundImage && <img id="background" src={backgroundImage} />}
        <span onClick={() => onMovieIDChange(0)} id="close">
          &times;
        </span>
        {movieDetails && processMovieDetails(movieDetails)}
      </div>
    </article>
  );
}

MovieModal.propTypes = {
  movieID: PropTypes.number.isRequired,
  onMovieIDChange: PropTypes.func.isRequired,
};

export default MovieModal;
