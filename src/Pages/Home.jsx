import React, { useState } from 'react';
import Genres from '../Genres/Genres'
import ContentFetcher from './ContentFetcher'
function Home() {
  const[selectedGenre,setSelectedGenre]=useState(null);

  const handleGenreSelect=(genreId)=>{
    setSelectedGenre(genreId);
  }
  return (
    <>
        <div className="home-container">
            <div className="home-section">
                <div className="genres"><Genres onGenreSelect={handleGenreSelect}/></div>
                <div className="content"><ContentFetcher genreId={selectedGenre}/></div>
            </div>
        </div>
    </>
  )
}

export default Home