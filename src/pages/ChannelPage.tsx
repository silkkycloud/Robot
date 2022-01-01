import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { useLocation, useParams } from 'react-router-dom'

import axios from 'axios'

import { apiUrlState } from '../state'

import { Box } from '@chakra-ui/react'
import Channel, { LoadingChannel } from '../components/Channel'

import { ChannelType } from '../types/api'
import useScrollPosition from '../hooks/useScrollPosition'

export const useFetchChannel = (
  channelPrefix: string,
  channelId: string | undefined
): [ChannelType, Dispatch<SetStateAction<ChannelType>>, boolean] => {
  const apiUrl = useRecoilValue(apiUrlState)
  const [data, setData] = useState<ChannelType>({
    id: '',
    name: '',
    avatarUrl: '',
    bannerUrl: '',
    description: '',
    nextpage: '',
    subscriberCount: 0,
    verified: false,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true

    const ac = new AbortController()

    const fetchChannel = () => {
      const channelPathPrefixes = ['/channel/', '/user/', '/c/']
      if (
        channelId != undefined &&
        channelPathPrefixes.includes(channelPrefix)
      ) {
        if (isMounted) setLoading(true)
        axios
          .get(apiUrl + channelPrefix + channelId, {
            signal: ac.signal,
          })
          .then((res) => {
            if (isMounted) {
              setData(res.data)
              setLoading(false)
            }
          })
          .catch((error) => {
            if (isMounted) setLoading(false)
            console.log(error)
          })
      }
    }

    fetchChannel()
    return () => {
      ac.abort()
      isMounted = false
    }
  }, [channelPrefix, channelId])

  return [data, setData, loading]
}

const ChannelPage = () => {
  const apiUrl = useRecoilValue(apiUrlState)
  const { pathname } = useLocation()
  const basePath = pathname.split('/')[1]
  const { id } = useParams()

  const [channelResults, setChannel, channelLoading] = useFetchChannel(
    `/${basePath}/`,
    id
  )

  const [nextPageLoading, setNextPageLoading] = useState(false)
  const scrollPosition = useScrollPosition()
  const mountPosition =
    window.innerHeight + scrollPosition >=
    document.body.offsetHeight - window.innerHeight

  useEffect(() => {
    let isMounted = true

    const ac = new AbortController()

    const fetchNextPage = () => {
      if (
        channelResults.relatedStreams &&
        channelResults.nextpage &&
        channelResults.id
      ) {
        if (isMounted) setNextPageLoading(true)
        axios
          .get(apiUrl + '/nextpage/channel/' + channelResults.id, {
            signal: ac.signal,
            params: {
              nextpage: channelResults.nextpage,
            },
          })
          .then((res) => {
            if (isMounted) {
              setChannel((prevState) => ({
                ...prevState,
                nextpage: res.data.nextpage,
                relatedStreams: [
                  // @ts-ignore
                  ...prevState.relatedStreams,
                  ...res.data.relatedStreams,
                ],
              }))
              setNextPageLoading(false)
            }
          })
          .catch((error) => {
            if (isMounted) setNextPageLoading(false)
            console.log(error)
          })
      }
    }

    if (mountPosition) fetchNextPage()
    return () => {
      ac.abort()
      isMounted = false
    }
  }, [
    mountPosition,
    channelResults.relatedStreams,
    channelResults.id,
    channelResults.nextpage,
    setChannel,
  ])

  let channel

  if (channelLoading) {
    channel = <LoadingChannel />
  } else {
    channel = (
      <Channel
        nextPageLoading={nextPageLoading}
        id={channelResults.id}
        name={channelResults.name}
        avatarUrl={channelResults.avatarUrl}
        bannerUrl={channelResults.bannerUrl}
        description={channelResults.description}
        subscriberCount={channelResults.subscriberCount}
        verified={channelResults.verified}
        relatedStreams={channelResults.relatedStreams}
      />
    )
  }

  return <Box>{channel}</Box>
}

export default ChannelPage
