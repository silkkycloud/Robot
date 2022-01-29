import React, { useState } from 'react'
import { useQuery } from 'react-query'

import { Box, SimpleGrid } from '@chakra-ui/react'
import Video, { LoadingVideos } from '../components/Video'
import { Stream } from '../types/api'

import ApiService from '../ApiService'
import axios, { AxiosError } from 'axios'
import { regionState } from '../state'
import { useRecoilValue } from 'recoil'

const TrendingPage = () => {
  const [trending, setTrending] = useState<Stream[]>([])
  const region = useRecoilValue(regionState)

  const { isLoading: isLoadingTrending, refetch: fetchTrending } = useQuery<
    Stream[],
    Error
  >(
    'trending',
    async () => {
      return await ApiService.fetchTrending(region)
    },
    {
      onSuccess: (res) => {
        setTrending(res)
      },
      onError: (err: AxiosError | Error) => {
        if (axios.isAxiosError(err)) {
          setTrending(err.response?.data)
        }
      },
    }
  )

  let trendingVideos

  if (isLoadingTrending) {
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
