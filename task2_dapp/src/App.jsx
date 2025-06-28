import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './Components/Navbar'
import Footer from './Components/Footer'
import HomePage from './Components/Homepage'
import WhitePaper from './Pages/WhitePaper'
import AboutUs from './Pages/AboutUs';

function App() {
  return (
    <Router>
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/whitepaper" element={<WhitePaper />} />
      <Route path='/aboutus' element={<AboutUs />}/>
    </Routes>
    <Footer />
  </Router>
  )
}

export default App