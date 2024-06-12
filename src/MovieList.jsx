import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import './MovieList.css';

function MovieList() {
    const [movies, setMovies] = useState(undefined);
    const [page, setPage] = useState(1);

    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchActive, setIsSearchActive] = useState(false);


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
                    url += `/movie/now_playing?language=en-US&page=${page}`;
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
    }, [page, isSearchActive, searchQuery]);

    const handleSearchSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        setSearchQuery(formData.get("query"));

        setPage(1);
    }

    const handleSearchToggle = (e) => {

        const button = e.target.name;
        if (button === "now-playing") {
            setIsSearchActive(false);
        } else if (button === "search") {
            setIsSearchActive(true);
        }

        setPage(1);
        setSearchQuery("");
    }

    return (
        <>
            <button onClick={handleSearchToggle} name="now-playing">Now Playing</button>
            <button onClick={handleSearchToggle} name="search">Search</button>

            {isSearchActive &&
                <form onSubmit={handleSearchSubmit}>
                    <input type="text" placeholder="Search" name="query" />
                    <button type="submit">X</button>
                </form>
            }

            <section className='movie-list'>
                {movies?.results.map(
                    movie =>
                        <MovieCard key={movie.id}
                            title={movie.title}
                            poster_path={movie.poster_path}
                            vote_average={movie.vote_average} />
                )}
            </section>

            {(movies && movies.results && movies.results.length > 0) ?
                <button onClick={() => setPage(page => page + 1)}>Load More</button> :
                <p>No movies found.</p>
            }
        </>
    );
}

export default MovieList;
