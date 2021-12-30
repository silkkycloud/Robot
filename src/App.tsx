import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Nav from './components/Nav'

import Home from './pages/Home'
import Trending from './pages/Trending'

export const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const App = () => {
  return (
    <div className="App">
      <ScrollToTop />
      <Nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
        </Routes>
      </Nav>
    </div>
  )
}

export default App
