import PropTypes from "prop-types";
import "./MovieCard.css";

import Card from "@mui/material/Card";
import { CardContent, CardMedia } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

function MovieCard({ movie, onMovieCardClick }) {
  return (
    <Card id="movie-card" onClick={() => onMovieCardClick.modal(movie.id)}>
      <CardMedia
        component="img"
        alt={movie.title}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://critics.io/img/movies/poster-placeholder.png"
        }
      />
      <CardContent id="card-info">
        <h2 id="title">{movie.title}</h2>
        <h4 id="rating">
          &#x2B50; {movie.vote_average ? movie.vote_average.toFixed(2) : 0}
        </h4>
        {onMovieCardClick.data.liked.includes(movie.title) ? (
          <FavoriteIcon
            className="action-button"
            onClick={(e) => onMovieCardClick.liked(e, movie.title)}
          />
        ) : (
          <FavoriteBorderIcon
            className="action-button"
            onClick={(e) => onMovieCardClick.liked(e, movie.title)}
          />
        )}
        {onMovieCardClick.data.watched.includes(movie.title) ? (
          <VisibilityIcon
            className="action-button"
            onClick={(e) => onMovieCardClick.watched(e, movie.title)}
          />
        ) : (
          <VisibilityOutlinedIcon
            className="action-button"
            onClick={(e) => onMovieCardClick.watched(e, movie.title)}
          />
        )}
      </CardContent>
    </Card>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  onMovieCardClick: PropTypes.object.isRequired,
};

export default MovieCard;
