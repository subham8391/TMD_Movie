import React from 'react';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Navbar from './Header/Navbar';
import Home from './Pages/Home';
import SearchResults from './Header/SearchResults';

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
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App