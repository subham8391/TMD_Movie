import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { FaStar } from "react-icons/fa6";
function CardCarousel({movies_type}) {
    const [images, setImages] = useState([]);
   
    useEffect(() => {
        const fetchPosterPaths = async () => {
            try {
                const apiKey = '40b317677e1de615188d40b08ccd4460';
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movies_type}?api_key=${apiKey}&page=5`);
                const data = await response.json();
                const paths = data.results;
                setImages(paths);
            } catch (error) {
                console.error('Error fetching poster paths:', error);
            }
        };

        fetchPosterPaths();
        
    }, []);

    return (
        <div className="carousel-wrapper">
            <Splide
                options={{
                    type   : 'loop',
                     perPage: 4,
                     perMove: 1,
                    padding: '10',
                    gap: 10,
                    pagination:false,
                    breakpoints: {
                        1000: {
                            perPage: 4,
                            padding: 0,
                            gap: 1
                        },
                        768: {
                            perPage: 1,
                            padding: 0,
                            gap: 1
                        }
                    },
                }}
            >
                {images.map((item) => (
                    <SplideSlide key={item.id}>
                        <div className="card-carousel-item">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                alt={item.title}
                            />
                            <div className="card-carousel-details">
                                <h3>{item.title}</h3>
                                <div className="ret-year">
                                    <p style={{display:'flex'}}><FaStar style={{color:'yellow'}}/> {item.vote_average.toFixed(1)}</p>
                                    <p style={{backgroundColor:'rgb(50, 50, 50)'}}>{item.release_date.split('-')[0]}</p>
                                </div>
                            </div>
                        </div>
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    );

}

export default CardCarousel;
