import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Details() {
    const { id } = useParams(); 
    const [details, setDetails] = useState(null); 
    useEffect(() => {
        const fetchDetailUrl = async () => {
            try {
                const apiKey = '40b317677e1de615188d40b08ccd4460';
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                setDetails(data);
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        };
        fetchDetailUrl();
    }, [id]);

    return (
        
        <div className='containt-details-container'>
            {details && ( 
                <div className="containt-details">
                    <h2>{details.title}</h2> 
                    <p><strong>Overview:</strong> {details.overview}</p>
                    <p><strong>Release Date:</strong> {details.release_date}</p>
                    <p><strong>Popularity:</strong> {details.popularity}</p>
                    {/* Add more details as needed */}
                </div>
            )}
        </div>
    );
}

export default Details;