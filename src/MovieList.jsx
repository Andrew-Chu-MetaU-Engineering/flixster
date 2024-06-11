import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import './MovieList.css';



function MovieList() {
    const [nowPlayingMovies, setNowPlayingMovies] = useState(undefined);
    const [nowPlayingPage, setNowPlayingPage] = useState(1);

    const [searchQuery, setSearchQuery] = useState("");
    const [searchMovies, setSearchMovies] = useState(undefined);
    const [searchPage, setSearchPage] = useState(0);

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
                let url = "";
                let page = 0;
                if (isSearchActive) {
                    page = searchPage;
                    url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=${page}`;
                } else {
                    page = nowPlayingPage;
                    url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
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

                if (isSearchActive) {
                    setSearchMovies(updateMoviesList);
                } else {
                    setNowPlayingMovies(updateMoviesList);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [nowPlayingPage, searchPage, searchQuery]);

    const handleSearchSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        setSearchQuery(formData.get("query"));

        setSearchPage(1);
    }

    const handleSearchToggle = () => {
        if (isSearchActive) {
            // returning to "now playing" page
            setSearchQuery("");
            setSearchMovies(undefined);
            setSearchPage(0);

            setNowPlayingPage(1);
        }
        setIsSearchActive(state => !state);
    }

    return (
        <>
            <button onClick={handleSearchToggle}>Toggle</button>

            {isSearchActive &&
                <form onSubmit={handleSearchSubmit}>
                    <input type="text" placeholder="Search" name="query" />
                    <button type="submit">X</button>
                </form>
            }

            <section className='movie-list'>
                {(isSearchActive ? searchMovies : nowPlayingMovies)?.results.map(
                    movie =>
                        <MovieCard key={movie.id}
                            title={movie.title}
                            poster_path={movie.poster_path}
                            vote_average={movie.vote_average} />
                )}
                {(searchPage > 0 || !isSearchActive) &&
                    (<button onClick={() => {
                        const setPage = isSearchActive ? setSearchPage : setNowPlayingPage;
                        setPage(page => page + 1);
                    }}>Load More</button>)
                }
            </section>
        </>
    );
}

export default MovieList;
