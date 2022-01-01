import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import Nav from './components/Nav'

import Home from './pages/Home'
import TrendingPage from './pages/TrendingPage'
import Settings from './pages/Settings'
import Feed from './pages/Feed'
import Subscriptions from './pages/Subscriptions'
import ChannelPage from './pages/ChannelPage'

export const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const App = () => {
  return (
    <RecoilRoot>
      <ScrollToTop />
      <Nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/c/:id/*" element={<ChannelPage />} />
          <Route path="/channel/:id/*" element={<ChannelPage />} />
          <Route path="/user/:id/*" element={<ChannelPage />} />
        </Routes>
      </Nav>
    </RecoilRoot>
  )
}

export default App
