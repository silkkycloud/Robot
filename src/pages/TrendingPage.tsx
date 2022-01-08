import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { Box, SimpleGrid } from '@chakra-ui/react'
import Video, { LoadingVideos } from '../components/Video'
import { TrendingType } from '../types/api'

import axios from 'axios'

import { apiUrlState } from '../state'

export const useFetchTrending = (region: string): [TrendingType, boolean] => {
  const apiUrl = useRecoilValue(apiUrlState)
  const [data, setData] = useState<TrendingType>([] as TrendingType)
  const [loading, setLoading] = useState(false)

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
  const [trending, trendingLoading] = useFetchTrending('US')

  let trendingVideos

  if (trendingLoading) {
    trendingVideos = <LoadingVideos />
  } else {
    trendingVideos = trending.map((video, index) => (
      <Video
        key={index}
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
    ))
  }

  return (
    <Box py={6} px={{ base: 4, sm: 6, lg: 8 }} mx="auto">
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, xl: 4, '2xl': 6 }}
        spacingX={{ sm: 4, md: 3 }}
        spacingY={{ base: 5, sm: 10 }}
      >
        {trendingVideos}
      </SimpleGrid>
    </Box>
  )
}

export default TrendingPage
