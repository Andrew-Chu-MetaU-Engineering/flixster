import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';
import './MovieList.css';

function MovieList({ isSearchActive, setIsSearchActive, onMovieCardClick }) {
    const [movies, setMovies] = useState(undefined);
    const [page, setPage] = useState(1);
    const [sortOptions, setSortOptions] = useState({ sortVal: "popularity", sortDir: "desc" });

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`
            }
        };
        async function fetchData() {
            try {
                let url = "https://api.themoviedb.org/3";
                if (isSearchActive) {
                    url += `/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=${page}`;
                } else {
                    url += `/discover/movie?include_adult=false&language=en-US&page=${page}&sort_by=${sortOptions.sortVal}.${sortOptions.sortDir}`;
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
                        const existingIds = new Set(prevData.results.map(item => item.id));
                        const filteredNewResults = data.results.filter(item => !existingIds.has(item.id));
                        return {
                            ...prevData,
                            results: [...prevData.results, ...filteredNewResults]
                        };
                    }
                    return prevData;
                }
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
    }

    const handleNowPlayingButton = () => {
        setIsSearchActive(false);
        setSortOptions({ sortVal: "popularity", sortDir: "desc" });

        setPage(1);
        setSearchQuery("");
    }

    const handleSearchButton = () => {
        setIsSearchActive(true);

        setPage(1);
        setSearchQuery("");
    }

    const handleSortVal = (e) => {
        setSortOptions((prevSortOptions) => ({ ...prevSortOptions, sortVal: e.target.value }));
    }
    const handleSortDir = (e) => {
        setSortOptions((prevSortOptions) => ({ ...prevSortOptions, sortDir: e.target.value }));
    }

    return (
        <>
            <button onClick={handleNowPlayingButton} name="now-playing" className="now-playing">Now Playing</button>
            <button onClick={handleSearchButton} name="search" className="search">Search</button>

            {!isSearchActive &&
                <form >
                    <select name="sortVal" value={sortOptions.sortVal} onChange={handleSortVal}>
                        <option value="popularity">Popularity</option>
                        <option value="vote_average">Rating</option>
                        <option value="primary_release_date">Release Date</option>
                        <option value="title">Title</option>
                    </select>
                    <select name="sortDir" value={sortOptions.sortDir} onChange={handleSortDir}>
                        <option value="asc">&#x25B2;</option>
                        <option value="desc">&#x25BC;</option>
                    </select>
                </form>
                // TODO handle filtering
            }

            {isSearchActive &&
                <form onSubmit={handleSearchSubmit}>
                    <input type="text" placeholder="Search" name="query" />
                    <button type="submit">X</button>
                </form>
            }

            <section className="movie-list">
                {movies?.results.map(
                    movie =>
                        <MovieCard key={movie.id} movie={movie}
                            onMovieCardClick={onMovieCardClick} />
                )}
            </section>

            {(movies && movies.results && movies.results.length > 0) ?
                <button onClick={() => setPage(page => page + 1)} className="load-more">Load More</button> :
                <p>No movies found.</p>
            }
        </>
    );
}

MovieList.propTypes = {
    isSearchActive: PropTypes.bool.isRequired,
    setIsSearchActive: PropTypes.func.isRequired,
    onMovieCardClick: PropTypes.object.isRequired,
}

export default MovieList;
