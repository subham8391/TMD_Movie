import React, { useEffect, useState } from 'react';
import { useLocation} from 'react-router-dom';
import { FaStar } from "react-icons/fa6";
function SearchResults() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');
    const [searchResults, setSearchResults] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                setLoading(true);
                const apiKey = '40b317677e1de615188d40b08ccd4460';
                const url = `https://api.themoviedb.org/3/search/movie?page=${page}&api_key=${apiKey}&query=${query}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setSearchResults(prevResults => [...prevResults, ...data.results]);
                setTotalPages(data.total_pages);
            } catch (error) {
                console.error('Error Fetching Data:', error);
                setSearchResults([]);
            } finally {
                setLoading(false);
            }
        };

        if (query && query !== '') {
            fetchSearchResults();
        }
    }, [query, page]);

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <>
            <div className="search-results">
                <div className="search-result-section">
                    {searchResults.map((item) => (
                        <div className="movie-container" key={item.id}>
                            <div className="movie-card">
                                <div className="movie-img">
                                    <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" />
                                </div>
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
                {!loading && totalPages > page && (
                    <div className="load-more">
                        <button onClick={handleLoadMore}>Load More</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default SearchResults;
