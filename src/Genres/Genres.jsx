import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Genres() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const apiKey = '40b317677e1de615188d40b08ccd4460';
                const genreListURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
                const response = await fetch(genreListURL);
                const data = await response.json();
                setGenres(data.genres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchGenres();
    }, []);

    return (
        <div className="genres-section">
            <h2>Genres</h2>
            {genres.map((genre) => (
                <Link
                    key={genre.id}
                    to={`/movies/${genre.id}/${genre.name}`} // Passing genre ID and name as parameters
                    className="g-names"
                >
                    {genre.name}
                </Link>
            ))}
        </div>
    );
}

export default Genres;
