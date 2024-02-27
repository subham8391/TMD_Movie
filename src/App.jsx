import React from 'react';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Navbar from './Header/Navbar';
import Movies from './Pages/Movies';
import Home from './Pages/Home';
import SearchResults from './Header/SearchResults';
// import Details from './Pages/Details';
import DetailsPage from './Pages/DetailsPage';

import './App.css'
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<SearchResults/>} />
            <Route path='/movies/:id/:name' element={<Movies/>} />
            <Route path='/details/:title/:id' element={<DetailsPage/>} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App