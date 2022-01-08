import React, { useEffect } from 'react'
import { ReactLocation, Router, Outlet, useRouter, Route } from 'react-location'
import { ReactLocationDevtools } from 'react-location-devtools'
import { RecoilRoot } from 'recoil'

import Nav from './components/Nav'

import Home from './pages/Home'
import TrendingPage from './pages/TrendingPage'
import Settings from './pages/Settings'
import Feed from './pages/Feed'
import Subscriptions from './pages/Subscriptions'
import ResultsPage from './pages/ResultsPage'
import ChannelPage from './pages/ChannelPage'

export const ScrollToTop = () => {
  const router = useRouter()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [router.state.location.pathname])

  return null
}

const routes: Route[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/trending',
    element: <TrendingPage />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/feed',
    element: <Feed />,
  },
  {
    path: '/subscriptions',
    element: <Subscriptions />,
  },
  {
    path: '/results',
    element: <ResultsPage />,
  },
  {
    path: '/c/:id',
    element: <ChannelPage />,
  },
  {
    path: '/channel/:id',
    element: <ChannelPage />,
  },
  {
    path: '/user/:id',
    element: <ChannelPage />,
  },
]

const location = new ReactLocation()

const App = () => {
  return (
    <div id="app">
      <RecoilRoot>
        <Router location={location} routes={routes}>
          <ScrollToTop />
          <Nav>
            <Outlet />
          </Nav>
          <ReactLocationDevtools initialIsOpen={false} />
        </Router>
      </RecoilRoot>
    </div>
  )
}

export default App
