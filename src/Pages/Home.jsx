import React, { useState } from 'react';
import Genres from '../Genres/Genres'
import NowPlaying from '../Slidbars/NowPlaying'
import CardCrousal from '../Slidbars/CardCrousal';
function Home() {
  
  return (
    <>
        <div className="home-container">
            <div className="home-section">
                <div className="genres"><Genres /></div>
                <div className="content">
                  <div className="nowplay-slider">
                    <NowPlaying />
                  </div>
                  <div className="top-rated">
                    <h1>Top Rated Movies</h1>
                    <CardCrousal movies_type={"top_rated"}/>
                  </div>
                  <div className="top-rated">
                    <h1>Upcoming Movies</h1>
                    <CardCrousal movies_type={"upcoming"}/>
                  </div>
                  <div className="top-rated">
                    <h1>Popular Movies</h1>
                    <CardCrousal movies_type={"popular"}/>
                  </div>
                  <div className="top-rated">
                    <h1>Now Playing Movies</h1>
                    <CardCrousal movies_type={"now_playing"}/>
                  </div>
                  </div>
            </div>
        </div>
    </>
  )
}

export default Home