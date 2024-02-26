import React, { useEffect, useState, useRef } from 'react';

function ContentFetcher({ genreId }) {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const bottomBoundaryRef = useRef(null);

    useEffect(() => {
        const fetchContent = async () => {
            if (!loading && page <= totalPages) {
                setLoading(true);
                try {
                    const apiKey = '6f6546c488597640b6c611e630aca586';
                    let contentListURL = `https://api.themoviedb.org/3/movie/now_playing?page=${page}&api_key=${apiKey}`;
                    if (genreId) {
                        contentListURL = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&page=${page}&api_key=${apiKey}`;
                    }
                    const response = await fetch(contentListURL);
                    const data = await response.json();
                    setContent(prevContent => [...prevContent, ...data.results]);
                    setTotalPages(data.total_pages);
                    setPage(prevPage => prevPage + 1);
                } catch (error) {
                    console.error('Error fetching content:', error);
                }
                setLoading(false);
            }
        };

        const handleScroll = () => {
            if (
                bottomBoundaryRef.current &&
                bottomBoundaryRef.current.getBoundingClientRect().top <= window.innerHeight
            ) {
                fetchContent();
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.scrollTo(0, 0); // Scroll to top when the component mounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, page, totalPages, genreId]);

    // Scroll to the top of movies-section when genreId changes
    useEffect(() => {
        const moviesSection = document.querySelector('.movies-section');
        if (moviesSection) {
            moviesSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, [genreId]);
    return (
        <>
            <div className="movie-content">
                <div className="movies-section">
                    {content
                        .filter(item => !genreId || item.genre_ids.includes(genreId))
                        .map((item) => (
                            <div className="movie-container" key={item.id}>
                                <div className="movie-card">
                                    <div className="movie-img">
                                        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" />
                                    </div>
                                    <div className="movie-details">
                                        <div className="m-detail">
                                            <p>{item.title}</p>
                                            <p>{item.vote_average.toFixed(1)}</p>
                                        </div>
                                        <div className="m-detail">
                                            <p>Language: {item.original_language}</p>
                                            <p>{item.release_date}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    <div ref={bottomBoundaryRef}></div>
                </div>
            </div>
        </>
    );
}

export default ContentFetcher;
