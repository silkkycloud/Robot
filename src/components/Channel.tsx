import React from 'react'

import {
  Box,
  Container,
  Image,
  Flex,
  Heading,
  Text,
  Icon,
  SkeletonCircle,
  Skeleton,
  SimpleGrid,
  Center,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react'
import LazyLoad from 'react-lazyload'
import { HiCheckCircle } from 'react-icons/hi'

import { numberFormat } from '../functions/format'
import urlify from '../functions/urlify'
import { purifyHTML } from '../functions/purify'
import Video, { LoadingVideo, LoadingVideos } from './Video'

import { StreamType, ChannelType } from '../types/api'

interface ChannelVideosProps {
  streamsData: StreamType
}

export const ChannelVideos = React.memo((props: ChannelVideosProps) => (
  <>
    {props.streamsData.map((video, i: number) => (
      <LazyLoad key={i.toString()} placeholder={<LoadingVideo />} offset={100}>
        <Video
          url={video.url}
          title={video.title}
          thumbnail={video.thumbnail}
          uploadedDate={video.uploadedDate}
          duration={video.duration}
          views={video.views}
        />
      </LazyLoad>
    ))}
  </>
))
ChannelVideos.displayName = 'ChannelVideos'

interface ChannelProps extends ChannelType {
  nextPageLoading: boolean
}

const Channel = (props: ChannelProps) => {
  const bgColor = useColorModeValue('background.light', 'background.dark')
  const normalColor = useColorModeValue('text.light', 'text.dark')
  const borderColor = useColorModeValue('border.light', 'border.dark')

  return (
    <Box pb={{ md: 6 }}>
      {props.bannerUrl && (
        <Image
          w="100%"
          bg={bgColor}
          src={props.bannerUrl}
          loading="lazy"
          alt={props.name}
          borderBottom="1px"
          borderColor={borderColor}
        />
      )}
      <Box borderBottom="1px" borderColor={borderColor}>
        <Container maxW="container.xl">
          <Flex flexDir="row" alignItems="center" pos="relative" py={5}>
            <Box
              display={{ base: 'none', md: 'block' }}
              mr={{ md: 5 }}
              rounded={{ md: 'full' }}
            >
              {props.avatarUrl && (
                <Image
                  rounded="full"
                  bg={bgColor}
                  src={props.avatarUrl}
                  loading="lazy"
                  name={props.name}
                  htmlWidth={62}
                  htmlHeight={62}
                />
              )}
            </Box>
            <Box>
              <Flex flexDir="row" alignItems="center">
                <Heading fontSize="2xl" fontWeight="medium">
                  {props.name}
                </Heading>
                {props.verified && (
                  <Icon
                    ml={1}
                    as={HiCheckCircle}
                    w={5}
                    h={5}
                    color={normalColor}
                  />
                )}
              </Flex>
              <Box>
                <Text fontSize="sm" color={normalColor}>
                  {numberFormat(props.subscriberCount)} subscribers
                </Text>
              </Box>
            </Box>
          </Flex>
          {props.description && (
            <Box pb={5}>
              <Text whiteSpace="pre-wrap">
                <span
                  dangerouslySetInnerHTML={{
                    __html: purifyHTML(urlify(props.description)),
                  }}
                />
              </Text>
            </Box>
          )}
        </Container>
      </Box>
      {/* Video grid */}
      {props.relatedStreams && (
        <Container maxW="container.xl" py={6}>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, xl: 4, '2xl': 6 }}
            spacingX={{ sm: 4, md: 3 }}
            spacingY={{ base: 5, sm: 10 }}
          >
            <ChannelVideos streamsData={props.relatedStreams} />
          </SimpleGrid>
          {props.nextPageLoading && (
            <Center my={8}>
              <Spinner size="xl" />
            </Center>
          )}
        </Container>
      )}
    </Box>
  )
}

export const LoadingChannel = () => {
  const borderColor = useColorModeValue('border.light', 'border.dark')
  const startColor = useColorModeValue('gray.300', 'neutral.800')
  const endColor = useColorModeValue('gray.200', 'neutral.700')

  return (
    <Box pb={{ md: 6 }}>
      <Box borderBottom="1px" borderColor={borderColor}>
        <Container maxW="container.xl">
          <Flex flexDir="row" alignItems="center" pos="relative" py={5}>
            <SkeletonCircle
              display={{ base: 'none', md: 'block' }}
              mr={{ md: 5 }}
              rounded={{ md: 'full' }}
              size="62px"
              startColor={startColor}
              endColor={endColor}
            />
            <Box>
              <Skeleton startColor={startColor} endColor={endColor}>
                <Heading fontSize="2xl" fontWeight="medium">
                  Lorem ipsum
                </Heading>
              </Skeleton>
              <Skeleton mt={1} startColor={startColor} endColor={endColor}>
                <Text fontSize="sm">0 subscribers</Text>
              </Skeleton>
            </Box>
          </Flex>
        </Container>
      </Box>
      {/* Video grid */}
      <Container maxW="container.xl" py={6}>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, xl: 4, '2xl': 6 }}
          spacingX={{ sm: 4, md: 3 }}
          spacingY={{ base: 5, sm: 10 }}
        >
          <LoadingVideos />
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Channel
