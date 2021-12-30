import React from 'react'
import { useSnapshot } from 'valtio'
import { useLocation } from 'react-router-dom'

import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Flex,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  Image,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Tag,
  Stack,
  useColorModeValue,
  VisuallyHidden,
  Icon,
} from '@chakra-ui/react'
import { AiFillFire, AiFillHeart } from 'react-icons/ai'
import { IoIosSettings } from 'react-icons/io'
import { HiMenuAlt2 } from 'react-icons/hi'
import { FaRss } from 'react-icons/fa'

import state from '../state'

import { IconType } from 'react-icons'

export type NavType = {
  name: string
  href: string
  Icon?: IconType
  auth?: boolean
}[]

export const navItems: NavType = [
  {
    name: 'Trending',
    href: '/trending',
    Icon: AiFillFire,
  },
  {
    name: 'Feed',
    href: '/feed',
    Icon: FaRss,
    auth: true,
  },
  {
    name: 'Subscriptions',
    href: '/subscriptions',
    Icon: AiFillHeart,
    auth: true,
  },
  {
    name: 'Settings',
    href: '/settings',
    Icon: IoIosSettings,
  },
]

export interface NavLinkProps {
  name: string
  href: string
  Icon?: IconType
}

export const NavLink = (props: NavLinkProps) => {
  const { pathname } = useLocation()

  return (
    <Box
      as={RouterLink}
      to={props.href}
      key={props.href}
      px={2}
      py={2}
      rounded="md"
      color={
        pathname === props.href
          ? useColorModeValue('red.600', 'white')
          : useColorModeValue('gray.600', 'neutral.400')
      }
      bg={
        pathname === props.href
          ? useColorModeValue('gray.100', 'neutral.900')
          : ''
      }
      _hover={{ bg: useColorModeValue('gray.50', 'neutral.900') }}
      fontSize="sm"
      fontWeight="medium"
      flexShrink={0}
    >
      <Flex flexDir="row" alignItems="center">
        <Icon
          as={props.Icon}
          flexShrink={0}
          mr={3}
          w={6}
          h={6}
          aria-hidden="true"
          color={pathname === props.href ? 'red.600' : 'gray.400'}
        />
        {props.name}
      </Flex>
    </Box>
  )
}

export const NavLinks = () => (
  <>
    {navItems.map((item, i: number) => (
      <NavLink
        key={i.toString()}
        name={item.name}
        href={item.href}
        Icon={item.Icon}
      />
    ))}
  </>
)

export interface SidebarOpenerProps {
  onOpen: () => void
}

export const SidebarOpener = (props: SidebarOpenerProps) => {
  return (
    <Box
      as="button"
      display={{ base: 'flex', lg: 'none' }}
      px={4}
      py={4}
      borderRight="1px"
      borderColor={useColorModeValue('gray.200', 'gray.900')}
      onClick={() => props.onOpen()}
    >
      <VisuallyHidden>Open sidebar</VisuallyHidden>
      <Icon
        as={HiMenuAlt2}
        w={8}
        h={8}
        color={useColorModeValue('gray.500', 'white')}
        aria-hidden="true"
      />
    </Box>
  )
}

export const StaticNav = () => {
  const snap = useSnapshot(state)

  return (
    <Box
      display={{ base: 'none', lg: 'flex' }}
      flexDir={{ lg: 'column' }}
      width={{ lg: 64 }}
      insetY={{ lg: 0 }}
      pos={{ lg: 'fixed' }}
    >
      <Flex
        pt={5}
        overflowY="auto"
        flexDir="column"
        h="100vh"
        flexGrow={1}
        bg={useColorModeValue('white', 'neutral.800')}
        borderRight="1px"
        borderColor={useColorModeValue('gray.200', 'gray.900')}
      >
        <RouterLink to="/">
          <Flex px={4} alignItems="center">
            <Image
              mr={3}
              src="/logo.svg"
              alt="Piped"
              htmlWidth={50}
              htmlHeight={50}
            />
            <Tag colorScheme="red">v{snap.version}</Tag>
          </Flex>
        </RouterLink>
        <Stack mt={5} px={2} pb={4} experimental_spaceY={1} as="nav">
          <NavLinks />
        </Stack>
      </Flex>
    </Box>
  )
}

export interface MobileNavProps {
  onOpen: () => void
  onClose: () => void
  isOpen: boolean
}

export const MobileNav = (props: MobileNavProps) => {
  const snap = useSnapshot(state)

  return (
    <>
      <Drawer isOpen={props.isOpen} placement="left" onClose={props.onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <RouterLink to="/">
              <Flex alignItems="center">
                <Image
                  mr={3}
                  src="/logo.svg"
                  alt="Piped"
                  htmlWidth={50}
                  htmlHeight={50}
                  onClick={() => props.onClose()}
                />
                <Tag colorScheme="red">v{snap.version}</Tag>
              </Flex>
            </RouterLink>
          </DrawerHeader>
          <DrawerBody>
            <Stack direction="column" as="nav" px={2} experimental_spaceY={1}>
              <NavLinks />
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <Stack direction="column" as="nav" px={2} experimental_spaceY={1}>
              fggf
            </Stack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export interface NavProps {
  children?: React.ReactNode
}

const Nav = (props: NavProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box as="section">
      {/* Dynamic sidebar for mobile */}
      <MobileNav isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

      {/* Static sidebar for desktop */}
      <StaticNav />

      {/* Sidebar menu opener and search bar */}
      <Flex pl={{ lg: 64 }} flexDir="column" flex={1}>
        <Flex
          top={0}
          zIndex={10}
          flexShrink={0}
          justifyContent={{ base: 'space-between', md: 'flex-end' }}
          alignItems="center"
          h={16}
          shadow="base"
          pos="sticky"
          bg={useColorModeValue('white', 'neutral.800')}
        >
          <SidebarOpener onOpen={onOpen} />
          <Flex px={4} flex={1} justify="space-between">
            <Flex w="100%" ml={{ lg: 0 }}>
              <Box pos="relative" w="100%">
                <Flex
                  pos="absolute"
                  insetY={0}
                  left={0}
                  alignItems="center"
                ></Flex>
              </Box>
            </Flex>
          </Flex>
        </Flex>
        {/* Primary page content */}
        {props.children && <Box flex={1}>{props.children}</Box>}
      </Flex>
    </Box>
  )
}

export default Nav
