import React from 'react';
import Genres from '../Genres/Genres';
import ContentFetcher from './ContentFetcher';
import { useParams } from 'react-router-dom';

function Movies() {
    const {id,name} = useParams();
    console.log(id);
    return (
        <>
            <div className="home-container">
                <div className="home-section">
                    <div className="genres"><Genres /></div>
                    <div className="content"><ContentFetcher genreId={id} genreName={name} /></div>
                </div>
            </div>
        </>
    );
}

export default Movies;
