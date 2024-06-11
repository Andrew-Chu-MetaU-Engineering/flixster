import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import './MovieList.css';


function MovieList() {
    const [movies, setMovies] = useState(undefined);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            }
        };

        const fetchData = async () => {
            await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
                .then(response => response.json())
                .then(response => setMovies(response))
                .catch(err => console.error(err));
        }

        fetchData();
    }, []);

    return (
        <section className='movie-list'>
            {movies?.results.map(
                movie =>
                    <MovieCard key={movie.title}
                        title={movie.title}
                        poster_path={movie.poster_path}
                        vote_average={movie.vote_average} />
            )}
        </section>
    );
}

export default MovieList;