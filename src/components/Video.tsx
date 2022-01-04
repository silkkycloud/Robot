import React from 'react'

import { timeFormat, numberFormat } from '../functions/format'

import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Image,
  Badge,
  Flex,
  Heading,
  Text,
  AspectRatio,
  Skeleton,
  SkeletonCircle,
  Avatar,
  Icon,
  LinkBox,
  LinkOverlay,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import { HiCheckCircle } from 'react-icons/hi'

interface VideoProps {
  url: string
  title: string
  thumbnail: string
  uploaderName?: string
  uploaderUrl?: string
  uploaderAvatar?: string
  uploadedDate: string
  duration: number
  views: number
  uploaderVerified?: boolean
}

const Video = (props: VideoProps) => {
  const bgColor = useColorModeValue('main.light', 'main.dark')
  const normalColor = useColorModeValue('text.light', 'text.dark')

  return (
    <LinkBox display="block" overflow="hidden" experimental_spaceY={4}>
      {/* Thumbnail */}
      <LinkOverlay as={RouterLink} to={props.url}>
        <AspectRatio ratio={16 / 9}>
          <Image
            fit="fill"
            minHeight="100%"
            minWidth="100%"
            src={props.thumbnail}
            loading="lazy"
            alt={props.title}
            htmlWidth={210}
            htmlHeight={118}
            bg={bgColor}
          />
        </AspectRatio>
        <Box pos="relative">
          <Box pos="absolute" bottom={0} right={0} pb={1} pr={1}>
            <Badge px={1.5} py={0.5} colorScheme="blackAlpha" variant="solid">
              {timeFormat(props.duration)}
            </Badge>
          </Box>
        </Box>
      </LinkOverlay>

      {/* Details */}
      <Flex flexDir="row" pos="relative">
        {props.uploaderAvatar && props.uploaderUrl && (
          <RouterLink to={props.uploaderUrl}>
            <Box display="block" mr={3}>
              <Avatar
                borderRadius="full"
                size="md"
                src={props.uploaderAvatar}
                loading="lazy"
                name={props.uploaderName}
                bg={bgColor}
              />
            </Box>
          </RouterLink>
        )}
        <Box experimental_spaceY={1} pr={2}>
          <LinkOverlay as={RouterLink} to={props.url}>
            <Heading as="h3" size="xs" noOfLines={2}>
              {props.title}
            </Heading>
          </LinkOverlay>
          <Box mt={1}>
            {props.uploaderName && props.uploaderUrl && (
              <RouterLink to={props.uploaderUrl}>
                <Flex alignItems="center" color={normalColor}>
                  <Text fontSize={{ base: 'xs', '2xl': 'sm' }} noOfLines={1}>
                    {props.uploaderName}
                  </Text>
                  {props.uploaderVerified && (
                    <Icon as={HiCheckCircle} ml={1} width={3} height={3} />
                  )}
                </Flex>
              </RouterLink>
            )}
            <Flex flexDir="row" alignItems="center">
              <Text fontSize="xs" color={normalColor}>
                {numberFormat(props.views)} views &#8226; {props.uploadedDate}
              </Text>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </LinkBox>
  )
}

export const LoadingVideo = () => {
  const startColor = useColorModeValue('gray.300', 'neutral.800')
  const endColor = useColorModeValue('gray.200', 'neutral.700')

  return (
    <Box display="block" overflow="hidden" experimental_spaceY={4}>
      {/* Thumbnail */}
      <AspectRatio ratio={16 / 9}>
        <Skeleton
          minWidth="100%"
          minHeight="100%"
          startColor={startColor}
          endColor={endColor}
        />
      </AspectRatio>

      {/* Details */}
      <Flex flexDir="row" pos="relative">
        <Box display="block" mr={2}>
          <SkeletonCircle
            size="48px"
            startColor={startColor}
            endColor={endColor}
          />
        </Box>
        <Skeleton pr={2} startColor={startColor} endColor={endColor}>
          Lorem ipsum dolor sit amet
        </Skeleton>
      </Flex>
    </Box>
  )
}

export const LoadingVideos = () => (
  <>
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
  </>
)

export default Video
