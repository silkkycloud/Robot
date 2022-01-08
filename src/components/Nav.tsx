import React from 'react'
import { useRecoilValue } from 'recoil'
import { Link as RouterLink } from 'react-location'

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

interface SidebarOpener {
  onSidebarOpen: () => void
}

export const SidebarOpener = (props: SidebarOpener) => {
  const borderColor = useColorModeValue('border.light', 'border.dark')

  return (
    <Box
      as="button"
      display={{ base: 'flex', lg: 'none' }}
      px={4}
      py={4}
      borderRight="1px"
      borderColor={borderColor}
      onClick={() => props.onSidebarOpen()}
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

interface NavBarProps {
  onSidebarOpen: () => void
  onSearchOpen: () => void
}

export const NavBar = (props: NavBarProps) => {
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
      <SidebarOpener onSidebarOpen={props.onSidebarOpen} />
      <Flex px={4} flex={1} justify="space-between">
        <Flex pos="relative" w="100%">
          <Flex pos="absolute" insetY={0} left={0} alignItems="center">
            {/* Search toggle */}
            <Button p={2} onClick={() => props.onSearchOpen()}>
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

interface MobileNavProps {
  isSidebarOpen: boolean
  onSidebarClose: () => void
}

export const MobileNav = (props: MobileNavProps) => {
  const version = useRecoilValue(versionState)

  return (
    <>
      <Drawer
        isOpen={props.isSidebarOpen}
        placement="left"
        onClose={props.onSidebarClose}
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
                  onClick={() => props.onSidebarClose()}
                />
                <Tag colorScheme="red">v{version}</Tag>
              </Flex>
            </RouterLink>
          </DrawerHeader>
          <DrawerBody>
            <Stack direction="column" as="nav" px={2} experimental_spaceY={1}>
              <NavLinks onClick={() => props.onSidebarClose()} />
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
    <>
      {/* Dynamic sidebar for mobile */}
      <MobileNav
        isSidebarOpen={isSidebarOpen}
        onSidebarClose={onSidebarClose}
      />

      {/* Static sidebar for desktop */}
      <StaticNav />

      {/* Search Bar */}
      <Search isSearchOpen={isSearchOpen} onSearchClose={onSearchClose} />

      {/* Primary page content */}
      <Flex pl={{ lg: 64 }} flexDir="column" flex={1}>
        {/* Navbar menu */}
        <NavBar onSearchOpen={onSearchOpen} onSidebarOpen={onSidebarOpen} />
        {props.children && <Box flex={1}>{props.children}</Box>}
      </Flex>
    </>
  )
}

export default Nav
