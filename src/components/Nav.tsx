import React, { createContext, useContext } from 'react'
import { useSnapshot } from 'valtio'
import { Link as RouterLink, useLocation } from 'wouter'

import {
  Box,
  Flex,
  DrawerContent,
  DrawerOverlay,
  Image,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Tag,
  Stack,
  VisuallyHidden,
  Icon,
  Drawer,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Kbd,
} from '@chakra-ui/react'
import { AiFillFire, AiFillHeart, AiOutlineSearch } from 'react-icons/ai'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { IoIosSettings } from 'react-icons/io'
import { HiMenuAlt2 } from 'react-icons/hi'
import { FaRss } from 'react-icons/fa'

import state from '../state'

import { IconType } from 'react-icons'
import Search from './Search'

export type navItems = {
  name: string
  href: string
  Icon?: IconType
  auth?: boolean
}[]

export const navItems: navItems = [
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
  const [location] = useLocation()

  const selectedBgColor = useColorModeValue('gray.100', 'neutral.900')
  const selectedColor = useColorModeValue('red.600', 'white')
  const normalColor = useColorModeValue('gray.600', 'neutral.400')

  return (
    <RouterLink href={props.href} key={props.name}>
      <Box
        as="button"
        p={2}
        rounded="md"
        color={location === props.href ? selectedColor : normalColor}
        bg={location === props.href ? selectedBgColor : ''}
        _hover={{ bg: selectedBgColor }}
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
            color={location === props.href ? 'red.600' : normalColor}
          />
          {props.name}
        </Flex>
      </Box>
    </RouterLink>
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

export const SearchButton = () => {
  const normalColor = useColorModeValue('gray.600', 'neutral.400')

  const nav = useContext(NavContext)

  return (
    <Box
      as="button"
      p={2}
      rounded="md"
      color={normalColor}
      _hover={{ bg: useColorModeValue('gray.100', 'neutral.900') }}
      fontSize="sm"
      fontWeight="medium"
      flexShrink={0}
      onClick={() => nav.onSearchOpen()}
    >
      <Flex flexDir="row" alignItems="center">
        <Icon
          as={AiOutlineSearch}
          flexShrink={0}
          mr={3}
          w={6}
          h={6}
          aria-hidden="true"
          color={normalColor}
        />
        Search
      </Flex>
    </Box>
  )
}

export const ThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  const normalColor = useColorModeValue('gray.600', 'neutral.400')

  return (
    <Box
      as="button"
      p={2}
      rounded="md"
      color={normalColor}
      _hover={{ bg: useColorModeValue('gray.100', 'neutral.900') }}
      fontSize="sm"
      fontWeight="medium"
      flexShrink={0}
      onClick={() => toggleColorMode()}
    >
      <Flex flexDir="row" alignItems="center">
        <Icon
          as={colorMode === 'light' ? MdDarkMode : MdLightMode}
          flexShrink={0}
          mr={3}
          w={6}
          h={6}
          aria-hidden="true"
          color={normalColor}
        />
        Theme
      </Flex>
    </Box>
  )
}

export const SidebarOpener = () => {
  const nav = useContext(NavContext)

  return (
    <Box
      as="button"
      display={{ base: 'flex', lg: 'none' }}
      px={4}
      py={4}
      borderRight="1px"
      borderColor={useColorModeValue('gray.200', 'gray.900')}
      onClick={() => nav.onSidebarOpen()}
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

export const NavBar = () => (
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
    <SidebarOpener />
    <Flex px={4} flex={1} justify="space-between">
      <Flex pos="relative" w="100%">
        <Flex pos="absolute" insetY={0} left={0} alignItems="center">
          <SearchButton />
        </Flex>
        <Flex pos="absolute" insetY={0} right={0} alignItems="center">
          <ThemeButton />
        </Flex>
      </Flex>
    </Flex>
  </Flex>
)

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
        <RouterLink href="/">
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

export const MobileNav = () => {
  const snap = useSnapshot(state)
  const nav = useContext(NavContext)

  return (
    <>
      <Drawer
        isOpen={nav.isSidebarOpen}
        placement="left"
        onClose={nav.onSidebarClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <RouterLink href="/">
              <Flex alignItems="center">
                <Image
                  mr={3}
                  src="/logo.svg"
                  alt="Piped"
                  htmlWidth={50}
                  htmlHeight={50}
                  onClick={() => nav.onSidebarClose()}
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
              I understand
            </Stack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export type NavContext = {
  isSidebarOpen: boolean
  onSidebarOpen: () => void
  onSidebarClose: () => void
  isSearchOpen: boolean
  onSearchOpen: () => void
  onSearchClose: () => void
}

export const NavContext = createContext<NavContext>({} as NavContext)

export interface NavProps {
  children?: React.ReactNode
}

const Nav = (props: NavProps) => {
  const {
    isOpen: isSidebarOpen,
    onOpen: onSidebarOpen,
    onClose: onSidebarClose,
  } = useDisclosure()
  const {
    isOpen: isSearchOpen,
    onOpen: onSearchOpen,
    onClose: onSearchClose,
  } = useDisclosure()

  return (
    <NavContext.Provider
      value={{
        isSidebarOpen: isSidebarOpen,
        onSidebarOpen: onSidebarOpen,
        onSidebarClose: onSidebarClose,
        isSearchOpen: isSearchOpen,
        onSearchOpen: onSearchOpen,
        onSearchClose: onSearchClose,
      }}
    >
      {/* Dynamic sidebar for mobile */}
      <MobileNav />

      {/* Static sidebar for desktop */}
      <StaticNav />

      {/* Search Bar */}
      <Search />

      {/* Primary page content */}
      <Flex pl={{ lg: 64 }} flexDir="column" flex={1}>
        {/* Navbar menu */}
        <NavBar />
        {props.children && <Box flex={1}>{props.children}</Box>}
      </Flex>
    </NavContext.Provider>
  )
}

export default Nav
