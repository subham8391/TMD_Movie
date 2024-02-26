import React,{useState,useEffect} from 'react'

function Genres({onGenreSelect}) {
    const[genres,setGenres]=useState([]);
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const apiKey = '6f6546c488597640b6c611e630aca586';
                const genreListURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
                const response = await fetch(genreListURL);
                const data = await response.json();
                //console.log(data)
                setGenres(data.genres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchGenres();
    }, []);

    const handleGenreSelect=(genreId)=>{
        onGenreSelect(genreId);
    }
  return (
    <>
        <div className="genres-section">
            <h2>Genres</h2>
        {genres.map(genre => (
                    <div className='g-names' key={genre.id} onClick={()=>handleGenreSelect(genre.id)}>{genre.name}</div>
                ))}
        </div>
    </>
  )
}

export default Genres