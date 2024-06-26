import PropTypes from "prop-types";
import "./MovieCard.css";

import Card from "@mui/material/Card";
import { CardContent, CardMedia } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

function MovieCard({
  movie,
  userData,
  handleMovieCardClick,
  handleMovieCardWatched,
  handleMovieCardLiked,
}) {
  return (
    <Card id="movie-card" onClick={() => handleMovieCardClick(movie.id)}>
      <CardMedia
        component="img"
        alt={movie.title + " Poster"}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://critics.io/img/movies/poster-placeholder.png"
        }
      />

      <CardContent id="card-info">
        <h3 id="title">{movie.title}</h3>
        <span id="rating-and-buttons">
          <h4 id="rating">
            &#x2B50; {movie.vote_average ? movie.vote_average.toFixed(2) : 0}
          </h4>
          <div id="button-wrapper">
            {userData.liked.includes(movie.title) ? (
              <FavoriteIcon
                className="action-button"
                onClick={(e) => handleMovieCardLiked(e, movie.title)}
              />
            ) : (
              <FavoriteBorderIcon
                className="action-button"
                onClick={(e) => handleMovieCardLiked(e, movie.title)}
              />
            )}
            {userData.watched.includes(movie.title) ? (
              <VisibilityIcon
                className="action-button"
                onClick={(e) => handleMovieCardWatched(e, movie.title)}
              />
            ) : (
              <VisibilityOutlinedIcon
                className="action-button"
                onClick={(e) => handleMovieCardWatched(e, movie.title)}
              />
            )}
          </div>
        </span>
      </CardContent>
    </Card>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  onMovieCardClick: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  handleMovieCardClick: PropTypes.func.isRequired,
  handleMovieCardWatched: PropTypes.func.isRequired,
  handleMovieCardLiked: PropTypes.func.isRequired,
};

export default MovieCard;
