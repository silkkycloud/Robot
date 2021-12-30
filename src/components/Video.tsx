import React from 'react'

import { timeFormat, numberFormat } from '../functions/format'

import { Link as RouterLink } from 'wouter'
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
  Tooltip,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import { HiCheckCircle } from 'react-icons/hi'

export interface VideoProps {
  url: string
  title: string
  thumbnail: string
  uploaderName: string
  uploaderUrl: string
  uploaderAvatar: string
  uploadedDate: string
  duration: number
  views: number
  uploaderVerified: boolean
}

const Video = (props: VideoProps) => {
  const normalBgColor = useColorModeValue('gray.300', 'neutral.800')
  const normalColor = useColorModeValue('gray.600', 'neutral.400')

  return (
    <Box display="block" overflow="hidden" experimental_spaceY={4}>
      {/* Thumbnail */}
      <RouterLink href={props.url}>
        <a>
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
              bg={normalBgColor}
            />
          </AspectRatio>
          <Box pos="relative">
            <Box pos="absolute" bottom={0} right={0} pb={1} pr={1}>
              <Badge px={1.5} py={0.5} colorScheme="blackAlpha" variant="solid">
                {timeFormat(props.duration)}
              </Badge>
            </Box>
          </Box>
        </a>
      </RouterLink>

      {/* Details */}
      <Flex flexDir="row" pos="relative">
        <RouterLink href={props.uploaderUrl}>
          <a>
            <Box display="block" mr={2}>
              <Avatar
                borderRadius="full"
                size={useBreakpointValue({ base: 'md', sm: 'sm', lg: 'md' })}
                src={props.uploaderAvatar}
                loading="lazy"
                name={props.uploaderName}
                bg={normalBgColor}
              />
            </Box>
          </a>
        </RouterLink>
        <Box experimental_spaceY={1} pr={2}>
          <RouterLink href={props.url}>
            <a>
              <Heading as="h3" size="xs" noOfLines={2}>
                {props.title}
              </Heading>
            </a>
          </RouterLink>
          <Box mt={1}>
            <RouterLink href={props.uploaderUrl}>
              <a>
                <Flex flexDir="row" alignItems="center" color={normalColor}>
                  <Tooltip
                    label={props.uploaderName}
                    aria-label={props.uploaderName}
                    bg={normalBgColor}
                    color={normalColor}
                    placement="top"
                  >
                    <Text fontSize={{ base: 'xs', '2xl': 'sm' }}>
                      {props.uploaderName}
                    </Text>
                  </Tooltip>
                  {props.uploaderVerified && (
                    <Box ml={1}>
                      <HiCheckCircle width={3} height={3} />
                    </Box>
                  )}
                </Flex>
              </a>
            </RouterLink>
            <RouterLink href={props.url}>
              <a>
                <Flex flexDir="row" alignItems="center">
                  <Text
                    fontSize={{ base: 'xs', '2xl': 'sm' }}
                    color={normalColor}
                  >
                    {numberFormat(props.views)} views &#8226;{' '}
                    {props.uploadedDate}
                  </Text>
                </Flex>
              </a>
            </RouterLink>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export const LoadingVideo = () => {
  const startColor = useColorModeValue('gray.300', 'neutral.800')
  const endColor = useColorModeValue('gray.200', 'neutral.700')

  return (
    <Box display="block" overflow="hidden">
      <Box experimental_spaceY={4}>
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
              size="36px"
              startColor={startColor}
              endColor={endColor}
            />
          </Box>
          <Box experimental_spaceY={1} pr={2}>
            <Skeleton startColor={startColor} endColor={endColor}>
              Lorem ipsum dolor sit amet
            </Skeleton>
            <Skeleton mt={1} startColor={startColor} endColor={endColor}>
              Lorem ipsum
            </Skeleton>
          </Box>
        </Flex>
      </Box>
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
