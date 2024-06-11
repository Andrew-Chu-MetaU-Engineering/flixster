import PropTypes from 'prop-types';
import "./MovieCard.css";

function MovieCard({ title, poster_path, vote_average }) {
    return (
        <article className="movie-card">
            <h3 className="title">{title}</h3>
            {poster_path && <img src={`https://image.tmdb.org/t/p/w200${poster_path}`} className="poster" />}
            <h3>{vote_average}</h3>
        </ article>
    );
}

MovieCard.propTypes = {
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number.isRequired,
}

export default MovieCard;
