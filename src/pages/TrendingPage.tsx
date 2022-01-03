import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import LazyLoad from 'react-lazyload'
import { Box, SimpleGrid } from '@chakra-ui/react'
import Video, { LoadingVideo, LoadingVideos } from '../components/Video'
import { TrendingType } from '../types/api'

import axios from 'axios'

import { apiUrlState } from '../state'

export const useFetchTrending = (region: string): [TrendingType, boolean] => {
  const apiUrl = useRecoilValue(apiUrlState)
  const [data, setData] = useState<TrendingType>([] as TrendingType)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const ac = new AbortController()

    const fetchTrending = () => {
      if (isMounted) setLoading(true)
      axios
        .get(apiUrl + '/trending', {
          signal: ac.signal,
          params: {
            region: region,
          },
        })
        .then((res) => {
          if (isMounted) {
            setData(res.data)
            setLoading(false)
          }
        })
        .catch((error) => {
          if (isMounted) {
            setLoading(false)
            console.log(error)
          }
        })
    }

    fetchTrending()
    return () => {
      ac.abort()
      isMounted = false
    }
  }, [region, apiUrl])

  return [data, loading]
}

const TrendingPage = () => {
  const [trendingResults, trendingLoading] = useFetchTrending('US')

  let trending

  if (trendingLoading) {
    trending = <LoadingVideos />
  } else {
    trending = trendingResults.map((video, i: number) => (
      <LazyLoad key={i} placeholder={<LoadingVideo />}>
        <Video
          url={video.url}
          title={video.title}
          thumbnail={video.thumbnail}
          uploaderName={video.uploaderName}
          uploaderUrl={video.uploaderUrl}
          uploaderAvatar={video.uploaderAvatar}
          uploadedDate={video.uploadedDate}
          duration={video.duration}
          views={video.views}
          uploaderVerified={video.uploaderVerified}
        />
      </LazyLoad>
    ))
  }

  return (
    <Box
      py={6}
      px={{ base: 4, sm: 6, lg: 8 }}
      mx="auto"
      className="py-6 mx-auto px-4 sm:px-6 lg:px-8"
    >
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, xl: 4, '2xl': 6 }}
        spacingX={{ sm: 4, md: 3 }}
        spacingY={{ base: 5, sm: 10 }}
      >
        {trending}
      </SimpleGrid>
    </Box>
  )
}

export default TrendingPage
