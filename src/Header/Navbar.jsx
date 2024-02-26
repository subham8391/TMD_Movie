import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
function Navbar() {
  return (
    <>
        <div className="container">
            <nav>
                <div className="navbar">
                    <div className="logo"><h1><Link to='/'>Silver Screen</Link></h1></div>
                    <div className="searchbar"><SearchBar /></div>
                </div>
            </nav>
        </div>
    </>
  )
}

export default Navbar