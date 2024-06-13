import PropTypes from 'prop-types';
import "./MovieCard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faEye } from '@fortawesome/free-solid-svg-icons'


function MovieCard({ movie, onMovieCardClick }) {
    return (
        <article onClick={() => onMovieCardClick.modal(movie.id)} className="movie-card">
            <h3 className="title">{movie.title}</h3>
            <img src={movie.poster_path ?
                `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://critics.io/img/movies/poster-placeholder.png"
            } className="poster" />
            <h4>&#x2B50; {movie.vote_average.toFixed(2)}</h4>
            <FontAwesomeIcon icon={faHeart} onClick={e => onMovieCardClick.liked(e, movie.title)}/>
            <FontAwesomeIcon icon={faEye} onClick={e => onMovieCardClick.watched(e, movie.title)}/>
        </ article>
    );
}

MovieCard.propTypes = {
    movie: PropTypes.object.isRequired,
    onMovieCardClick: PropTypes.object.isRequired,
}

export default MovieCard;
