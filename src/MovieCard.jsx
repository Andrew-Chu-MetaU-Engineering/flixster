import PropTypes from 'prop-types';
import "./MovieCard.css";

function MovieCard({ movie, onMovieClick }) {
    return (
        <article onClick={(e) => onMovieClick(e, movie.id)} className="movie-card">
            <h3 className="title">{movie.title}</h3>
            <img src={movie.poster_path ?
                `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://critics.io/img/movies/poster-placeholder.png"
            } className="poster" />
            <h4>&#x2B50; {movie.vote_average.toFixed(2)}</h4>
            <button type="text" name="like">Like</button>
            <button type="text" name="watched">Watched</button>
        </ article>
    );
}

MovieCard.propTypes = {
    movie: PropTypes.object.isRequired,
    onMovieClick: PropTypes.func.isRequired,
}

export default MovieCard;
