import React, { useState, useEffect } from 'react'
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { GoDotFill } from "react-icons/go";
import { FaStar } from "react-icons/fa6";
import '../App.css'
function NowPlaying() {
    const [images, setImages] = useState([]);
    const [genres, setGenres] = useState({});
    useEffect(() => {
        const fetchPosterPaths = async () => {
            try {
                const apiKey = '40b317677e1de615188d40b08ccd4460';
                const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`);
                const data = await response.json();
                const paths = (data.results);
                console.log(paths);
                setImages(paths);
            } catch (error) {
                console.error('Error fetching poster paths:', error);
            }
        };

        const fetchGenres = async () => {
            try {
                const apiKey = '40b317677e1de615188d40b08ccd4460';
                const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
                const data = await response.json();
                const genresMap = {};
                data.genres.forEach(genre => {
                    genresMap[genre.id] = genre.name;
                });
                setGenres(genresMap);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchPosterPaths();
        fetchGenres();
    }, []);

    return (
        <div className="carousel-wrapper">
            <Splide
                options={{
                    type: 'fade',
                    rewind: true,
                    perPage: 1,
                    autoplay: true,
                    interval: 1000,
                    padding: '0',
                    gap: 5,
                    breakpoints: {
                        1000: {
                            perPage: 1,
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
                        <div className="carousel-item">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                                alt=''
                            />
                            <div className="overlay-text">
                               <div className="np-detail">
                                <h1>{item.title}</h1>
                                <p>{item.release_date.split('-')[0]} <span ><FaStar style={{color:'yellow'}}/>{item.vote_average.toFixed(1)}</span></p>
                                <h3>{item.genre_ids.map((genreId, i) => (
                                    <>
                                        <span key={i}>{genres[genreId]}</span>
                                        <GoDotFill />
                                        </>
                                ))}</h3>
                                <p>{item.overview
}</p>
                               </div>
                            </div>
                        </div>
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    );
}

export default NowPlaying