import React from 'react'

import { Link as RouterLink } from 'react-location'
import {
  AspectRatio,
  Avatar,
  Badge,
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
  LinkBox,
  LinkOverlay,
  Skeleton,
  SkeletonCircle,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react'
import { HiCheckCircle } from 'react-icons/hi'

import { numberFormat, timeFormat } from '../functions/format'

interface WideVideoProps {
  url: string
  title: string
  description?: string
  thumbnail: string
  uploaderName?: string
  uploaderUrl?: string
  uploaderAvatar?: string
  uploaderVerified?: boolean
  uploadedDate: string
  duration: number
  views: number
}

const WideVideo = (props: WideVideoProps) => {
  const bgColor = useColorModeValue('main.light', 'main.dark')
  const normalColor = useColorModeValue('text.light', 'text.dark')
  const descriptionLines = useBreakpointValue({ base: 1, sm: 2, md: 4 })

  return (
    <LinkBox
      display="flex"
      overflow="hidden"
      alignItems={{ base: 'center', sm: 'flex-start' }}
      experimental_spaceY={4}
    >
      {/* Thumbnail */}
      <Box flex={1} display="block" mr={4} maxW={420} maxH={236}>
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
      </Box>

      {/* Details */}
      <Flex flex={1} flexDir="column" experimental_spaceY={1}>
        <LinkOverlay as={RouterLink} to={props.url}>
          <Heading as="h2" size="sm" noOfLines={2}>
            {props.title}
          </Heading>
        </LinkOverlay>
        <Box mt={1}>
          <Flex flexDir="row" alignItems="center">
            <Text fontSize="xs" color={normalColor}>
              {numberFormat(props.views)} views &#8226; {props.uploadedDate}
            </Text>
          </Flex>
          {props.uploaderAvatar && props.uploaderUrl && props.uploaderName && (
            <RouterLink to={props.uploaderUrl}>
              <Flex
                mt={{ base: 0, sm: 3 }}
                flexDir="row"
                alignItems="center"
                color={normalColor}
              >
                <Avatar
                  display={{ base: 'none', sm: 'block' }}
                  borderRadius="full"
                  size="xs"
                  src={props.uploaderAvatar}
                  loading="lazy"
                  name={props.uploaderName}
                  bg={bgColor}
                />
                <Text ml={{ base: 0, sm: 3 }} fontSize="xs" noOfLines={1}>
                  {props.uploaderName}
                </Text>
                {props.uploaderVerified && (
                  <Icon as={HiCheckCircle} ml={1} width={3} height={3} />
                )}
              </Flex>
            </RouterLink>
          )}
          {props.description && (
            <Box display={{ base: 'none', sm: 'block' }} mt={2}>
              <Text
                color={normalColor}
                fontSize="xs"
                noOfLines={descriptionLines}
              >
                {props.description}
              </Text>
            </Box>
          )}
        </Box>
      </Flex>
    </LinkBox>
  )
}

export const LoadingWideVideo = () => {
  const startColor = useColorModeValue('gray.300', 'neutral.800')
  const endColor = useColorModeValue('gray.200', 'neutral.700')

  return (
    <Flex
      alignItems={{ base: 'center', sm: 'flex-start' }}
      experimental_spaceY={4}
    >
      {/* Thumbnail */}
      <Box flex={1} display="block" mr={4} maxW={420} maxH={236}>
        <AspectRatio ratio={16 / 9}>
          <Skeleton
            minWidth="100%"
            minHeight="100%"
            startColor={startColor}
            endColor={endColor}
          />
        </AspectRatio>
      </Box>

      {/* Details */}
      <Flex flex={1} flexDir="column" experimental_spaceY={1}>
        <Skeleton startColor={startColor} endColor={endColor}>
          Lorem ipsum dolor sit amet
        </Skeleton>
        <Box mt={1}>
          <Flex mt={{ base: 0, sm: 3 }} flexDir="row" alignItems="center">
            <SkeletonCircle
              display={{ base: 'none', sm: 'block' }}
              size="24px"
              startColor={startColor}
              endColor={endColor}
            />
            <Skeleton
              display={{ base: 'none', sm: 'block' }}
              ml={{ base: 0, sm: 3 }}
              startColor={startColor}
              endColor={endColor}
            >
              Lorem ipsum
            </Skeleton>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  )
}

export const LoadingWideVideos = () => (
  <>
    <LoadingWideVideo />
    <LoadingWideVideo />
    <LoadingWideVideo />
    <LoadingWideVideo />
    <LoadingWideVideo />
    <LoadingWideVideo />
    <LoadingWideVideo />
    <LoadingWideVideo />
    <LoadingWideVideo />
    <LoadingWideVideo />
  </>
)

export default WideVideo
