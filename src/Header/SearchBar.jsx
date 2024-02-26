import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
function SearchBar() {
  const[searchQuery,setSearchQuery]=useState('');
  const navigate=useNavigate();

  const handleSearchChange=(e)=>{
    setSearchQuery(e.target.value);
  }
  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
        navigate(`/search?q=${searchQuery}`);
    }
};

// const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && searchQuery.trim() !== '') {
//         navigate(`/search?q=${searchQuery}`);
//     }
// };
  return (
    <>
        <div className="search-container">
            <form action="">
                <input type="search" id='search' placeholder='Search Movies...' 
                value={searchQuery}
                onChange={handleSearchChange}
                //onKeyDown={handleKeyDown}
                />
            </form>
            <button className='search-btn' onClick={handleSearch}><FaSearch /></button>
        </div>
    </>
  )
}

export default SearchBar