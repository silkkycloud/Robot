import React, { createContext, useContext } from 'react'
import { useRecoilValue } from 'recoil'
import { Link as RouterLink } from 'react-router-dom'

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
} from '@chakra-ui/react'
import NavLinks from './NavLinks'
import Button from './Button'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { HiMenuAlt2 } from 'react-icons/hi'

import { versionState } from '../state'

import Search from './Search'

export const SidebarOpener = () => {
  const nav = useContext(NavContext)

  const borderColor = useColorModeValue('border.light', 'border.dark')

  return (
    <Box
      as="button"
      display={{ base: 'flex', lg: 'none' }}
      px={4}
      py={4}
      borderRight="1px"
      borderColor={borderColor}
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

export const NavBar = () => {
  const nav = useContext(NavContext)
  const { colorMode, toggleColorMode } = useColorMode()

  const normalColor = useColorModeValue('text.light', 'text.dark')
  const bgColor = useColorModeValue('main.light', 'main.dark')

  return (
    <Flex
      top={0}
      zIndex={10}
      flexShrink={0}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      alignItems="center"
      h={16}
      pos="sticky"
      bg={bgColor}
      shadow="base"
    >
      <SidebarOpener />
      <Flex px={4} flex={1} justify="space-between">
        <Flex pos="relative" w="100%">
          <Flex pos="absolute" insetY={0} left={0} alignItems="center">
            {/* Search toggle */}
            <Button p={2} onClick={() => nav.onSearchOpen()}>
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
            </Button>
          </Flex>
          <Flex pos="absolute" insetY={0} right={0} alignItems="center">
            {/* Theme toggle */}
            <Button p={2} onClick={() => toggleColorMode()}>
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
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export const StaticNav = () => {
  const version = useRecoilValue(versionState)

  const borderColor = useColorModeValue('border.light', 'border.dark')
  const bgColor = useColorModeValue('main.light', 'main.dark')

  return (
    <Box
      display={{ base: 'none', lg: 'flex' }}
      flexDir={{ lg: 'column' }}
      width={{ lg: 64 }}
      insetY={{ lg: 0 }}
      pos={{ lg: 'fixed' }}
      bg={bgColor}
    >
      <Flex
        pt={5}
        overflowY="auto"
        flexDir="column"
        h="100vh"
        flexGrow={1}
        borderRight="1px"
        borderColor={borderColor}
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
            <Tag colorScheme="red">v{version}</Tag>
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
  const version = useRecoilValue(versionState)
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
            <RouterLink to="/">
              <Flex alignItems="center">
                <Image
                  mr={3}
                  src="/logo.svg"
                  alt="Piped"
                  htmlWidth={50}
                  htmlHeight={50}
                  onClick={() => nav.onSidebarClose()}
                />
                <Tag colorScheme="red">v{version}</Tag>
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
