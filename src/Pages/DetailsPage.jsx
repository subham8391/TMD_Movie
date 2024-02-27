import React,{useEffect} from 'react';
import Genres from '../Genres/Genres'
import Details from './Details';
import Similer from '../Slidbars/Similer';
import { useParams } from 'react-router-dom';
function DetailsPage() {
    const { id } = useParams(); 
        useEffect(() => {
          
          window.scrollTo(0, 0);
        }, []);
    return (
        <>
            <div className="home-container">
                <div className="home-section">
                    <div className="genres"><Genres /></div>
                    <div className="detail-page-content">
                        <Details mid={id} />
                        <div className="similar-content">
                            <h1>You May Also Like</h1>
                        <Similer mid={id} />
                        </div>
                        </div>

                </div>
            </div>
        </>
    )
}

export default DetailsPage