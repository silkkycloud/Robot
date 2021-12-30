import React, { useEffect } from 'react'
import { Route, useLocation } from 'wouter'

import Nav from './components/Nav'

import Home from './pages/Home'
import Trending from './pages/Trending'
import Settings from './pages/Settings'
import Feed from './pages/Feed'
import Subscriptions from './pages/Subscriptions'

export const ScrollToTop = () => {
  const [location] = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return null
}

const App = () => {
  return (
    <div className="App">
      <ScrollToTop />
      <Nav>
        <Route path="/" component={Home} />
        <Route path="/trending" component={Trending} />
        <Route path="/settings" component={Settings} />
        <Route path="/feed" component={Feed} />
        <Route path="/subscriptions" component={Subscriptions} />
      </Nav>
    </div>
  )
}

export default App
