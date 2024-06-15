import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MovieCard from "./MovieCard.jsx";
import data from "./data/data.js";
import "./MovieDisplayBody.css";

import { Button, Select, MenuItem, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function MovieDisplayBody({
  isSearchActive,
  setIsSearchActive,
  userData,
  handleMovieCardClick,
  handleMovieCardWatched,
  handleMovieCardLiked,
}) {
  const [movies, setMovies] = useState(undefined);
  const [page, setPage] = useState(1);
  const [sortOptions, setSortOptions] = useState({
    sortVal: "popularity",
    sortDir: "desc",
    filterGenre: "",
  });

  const [searchQuery, setSearchQuery] = useState("");

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
        let url = "https://api.themoviedb.org/3";
        if (isSearchActive) {
          url += `/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=${page}`;
        } else {
          url += `/discover/movie?include_adult=false&language=en-US&page=${page}&sort_by=${sortOptions.sortVal}.${sortOptions.sortDir}&with_genres=${sortOptions.filterGenre}`;
        }

        const response = await fetch(url, options);
        const data = await response.json();
        if (!data || !data.results) {
          throw new Error("Failed to fetch TMDB data.");
        }

        const updateMoviesList = (prevData) => {
          if (page === 1) {
            return data;
          } else if (prevData && prevData.results) {
            const existingIds = new Set(
              prevData.results.map((item) => item.id)
            );
            const filteredNewResults = data.results.filter(
              (item) => !existingIds.has(item.id)
            );
            return {
              ...prevData,
              results: [...prevData.results, ...filteredNewResults],
            };
          }
          return prevData;
        };
        setMovies(updateMoviesList);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [page, isSearchActive, searchQuery, sortOptions]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    setSearchQuery(formData.get("query"));

    setPage(1);
  };

  const handleNowPlayingButton = () => {
    setIsSearchActive(false);
    setSortOptions({ sortVal: "popularity", sortDir: "desc", filterGenre: "" });

    setPage(1);
    setSearchQuery("");
  };

  const handleSearchButton = () => {
    setIsSearchActive(true);

    setPage(1);
    setSearchQuery("");
  };

  const handleSortOptions = (property) => (e) => {
    setSortOptions((prevSortOptions) => ({
      ...prevSortOptions,
      [property]: e.target.value,
    }));
  };

  return (
    <section id="list-wrapper">
      <span className="settings mui-input">
        <Button
          onClick={handleNowPlayingButton}
          name="now-playing"
          variant="contained"
          className="mui-input"
        >
          Now Playing
        </Button>
        <Button
          onClick={handleSearchButton}
          name="search"
          variant="outlined"
          className="mui-input"
        >
          Search
        </Button>
      </span>

      <span className="settings">
        {isSearchActive ? (
          <form onSubmit={handleSearchSubmit} className="mui-input">
            <TextField
              type="text"
              name="query"
              label="Search Movies"
              variant="outlined"
            />
            <IconButton type="submit" variant="contained">
              <SearchIcon />
            </IconButton>
          </form>
        ) : (
          <form>
            <Select
              name="sortVal"
              value={sortOptions.sortVal}
              onChange={handleSortOptions("sortVal")}
            >
              <MenuItem value="popularity">Popularity</MenuItem>
              <MenuItem value="vote_average">Rating</MenuItem>
              <MenuItem value="primary_release_date">Release Date</MenuItem>
              <MenuItem value="title">Title</MenuItem>
            </Select>
            <Select
              name="sortDir"
              value={sortOptions.sortDir}
              onChange={handleSortOptions("sortDir")}
            >
              <MenuItem value="asc">&#x25B2;</MenuItem>
              <MenuItem value="desc">&#x25BC;</MenuItem>
            </Select>
            <Select
              name="filterGenre"
              value={sortOptions.filterGenre}
              onChange={handleSortOptions("filterGenre")}
              className="mui-input"
            >
              <MenuItem value="" dense={true}>
                All Genres
              </MenuItem>
              {data.genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </form>
        )}
      </span>

      <section id="movie-list">
        {movies?.results.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            userData={userData}
            handleMovieCardClick={handleMovieCardClick}
            handleMovieCardWatched={handleMovieCardWatched}
            handleMovieCardLiked={handleMovieCardLiked}
          />
        ))}
      </section>

      <span className="settings mui-input">
        {movies && movies.results && movies.results.length > 0 ? (
          <Button
            onClick={() => setPage((page) => page + 1)}
            variant="contained"
          >
            Load More
          </Button>
        ) : (
          <p>No movies found.</p>
        )}
      </span>
    </section>
  );
}

MovieDisplayBody.propTypes = {
  isSearchActive: PropTypes.bool.isRequired,
  setIsSearchActive: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  handleMovieCardClick: PropTypes.func.isRequired,
  handleMovieCardWatched: PropTypes.func.isRequired,
  handleMovieCardLiked: PropTypes.func.isRequired,
};

export default MovieDisplayBody;
