import React, { useState, useEffect } from 'react';
import { FaStar } from "react-icons/fa6";
function Details({ mid }) {
    const [details, setDetails] = useState(null);
    useEffect(() => {
        const fetchDetailUrl = async () => {
            try {
                const apiKey = '40b317677e1de615188d40b08ccd4460';
                const response = await fetch(`https://api.themoviedb.org/3/movie/${mid}?api_key=${apiKey}&append_to_response=casts,videos,images,releases`);
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
    }, [mid]);

    return (
        <div className="main-details-container">
            <div className='containt-details-container'>
                {details && (
                    <div className="containt-details">
                        <div className="back-cover">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${details.backdrop_path}`}
                                alt=''
                            />
                        </div>
                        <div className="backdrop-cover">
                            <div className="thubnail">
                                <img src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} alt="" />
                            </div>
                            <div className="details-movie">
                                <h1>{details.title}</h1>
                                <div className="a-details">
                                    <p style={{ display: 'flex' }}><FaStar style={{ color: 'yellow' }} /> {details.vote_average.toFixed(1)}</p>
                                    <p>{details.runtime}m</p>
                                    <p style={{ backgroundColor: 'rgb(50, 50, 50)' }}>{details.release_date.split('-')[0]}</p>
                                    <p style={{ backgroundColor: 'rgb(50, 50, 50)' }}>{details.adult !== true ? 'UA' : '18+'}</p>

                                </div>
                                <div className="genre">
                                    {details.genres.map((genre, index) => (
                                        <span key={index}>{genre.name} .</span>
                                    ))}
                                </div>
                                <div className="dis-details">
                                    <p>{details.overview}</p>
                                </div>
                                <div className="cust-details">
                                    <p className="c-lable">Starring</p>
                                    <p className="c-value">
                                        {details.casts && details.casts.cast.slice(0, 10).map((per, index) => (
                                            <span key={index}>{per.name},</span>
                                        ))}
                                    </p>
                                </div>
                                {details.casts && details.casts.crew.length > 0 && (
                                    <div className="directing-crew">
                                        <p className="crew-label">Directors</p>
                                        <p className="crew-names">
                                            {details.casts.crew
                                                .filter(member => member.known_for_department === 'Directing')
                                                .slice(0, 5) // Limit to 5 directors
                                                .map((director, index) => (
                                                    <span key={index}>{director.name},</span>
                                                ))}
                                        </p>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Details;
