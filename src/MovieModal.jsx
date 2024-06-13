import { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import "./MovieModal.css"

function MovieModal({ movieID, onMovieIDChange }) {
    const [movieDetails, setMovieDetails] = useState(null);

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
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?language=en-US&append_to_response=videos`, options);
                const data = await response.json();
                if (!data) {
                    throw new Error("Failed to fetch TMDB data.");
                }
                setMovieDetails(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [movieID]);

    console.log("delta", movieDetails);

    function processMovieDetails(details) {
        const runtimeStr = details.runtime > 59 ?
            `${Math.floor(details.runtime / 60)}h ${(details.runtime % 60)}m` : `${(details.runtime % 60)}m`
        const releaseDateStr = new Date(details.release_date).toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
        const genresStr = details.genres.map(genre => genre.name).join(", ");
        // if (details.videos) {
        //     const trailerURL = details.videos.filter(video => video.type === "Trailer" && video.site === "Youtube")
        //         .sort((a, b) => new Date(b.published_at).getDate() - new Date(a.published_at).getDate())
        // }
        console.log(details.release_date)

        return (
            <article>
                <h3>{details.title}</h3>
                {details.backdrop_path && <img src={`https://image.tmdb.org/t/p/w1280${details.backdrop_path}`} id="backdrop" />}
                <p>Runtime: {runtimeStr}</p>
                {details.release_date && <p>Released on {releaseDateStr}</p>}
                {genresStr && <p>Genre: {genresStr}</p>}
                <p>{details.overview}</p>
                {/* <p>{trailerURL}</p> */}
                {details.poster_path && <img src={`https://image.tmdb.org/t/p/w780${details.poster_path}`} id="poster" />}
            </article>
        );
    }

    return (
        <div id="modal-overlay">
            <div id="modal-content">
                <span>
                    <span onClick={() => onMovieIDChange(0)} id="close">&times;</span>
                </span>
                {movieDetails && processMovieDetails(movieDetails)}
            </div>
        </div>
    )
}

MovieModal.propTypes = {
    movieID: PropTypes.number.isRequired,
    onMovieIDChange: PropTypes.func.isRequired,
}

export default MovieModal;