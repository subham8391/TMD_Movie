import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa6";


function ContentFetcher({ genreId,genreName }) {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const apiKey = '40b317677e1de615188d40b08ccd4460';
                let contentListURL = `https://api.themoviedb.org/3/movie/now_playing?page=${page}&api_key=${apiKey}`;
                if (genreId) {
                    contentListURL = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&page=${page}&api_key=${apiKey}`;
                }
                const response = await fetch(contentListURL);
                const data = await response.json();
                console.log(data)
                setContent(data.results);
                setTotalPages(data.total_pages);
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        };

        fetchContent();
    }, [page, genreId]);

    const handleNextPage = () => {
        setPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
    };

    return (
        <>
            <div className="movie-content">
                <h1 className='movie-content-head'>All {genreName} Movies</h1>
                <div className="movies-section">
                    {content.map((item) => (
                        <div className="movie-container" key={item.id}>
                            <div className="movie-card">
                                <Link to={`/details/${item.title}/${item.id}`}>
                                    <div className="movie-img">
                                        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" />
                                    </div>
                                </Link>
                                <div className="movie-details">
                                    <div className="m-detail">
                                        <p style={{width:'80%',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{item.title}</p>
                                        <p style={{display:'flex'}}><FaStar style={{color:'yellow'}}/> {item.vote_average.toFixed(1)}</p>
                                    </div>
                                    <div className="m-detail">
                                        <p>Language: {item.original_language}</p>
                                        <p style={{backgroundColor:'rgb(50, 50, 50)'}}>{item.release_date.split('-')[0]}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
                    <span>{page} of {totalPages}</span>
                    <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
                </div>
            </div>
        </>
    );
}

export default ContentFetcher;