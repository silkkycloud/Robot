import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Nav from './components/Nav'

import Home from './pages/Home'
import Trending from './pages/Trending'
import Settings from './pages/Settings'
import Feed from './pages/Feed'
import Subscriptions from './pages/Subscriptions'
import Channel from './pages/Channel'

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
          <Route path="/settings" element={<Settings />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/c/:id/*" element={<Channel />} />
          <Route path="/channel/:id/*" element={<Channel />} />
          <Route path="/user/:id/*" element={<Channel />} />
        </Routes>
      </Nav>
    </div>
  )
}

export default App
