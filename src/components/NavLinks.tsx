import React from 'react'

import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Flex, Icon, useColorModeValue } from '@chakra-ui/react'
import Button from './Button'
import { AiFillFire, AiFillHeart } from 'react-icons/ai'
import { FaRss } from 'react-icons/fa'
import { IoIosSettings } from 'react-icons/io'

import { IconType } from 'react-icons'

type navItems = {
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

interface NavLinkProps {
  name: string
  href: string
  Icon?: IconType
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export const NavLink = (props: NavLinkProps) => {
  const { pathname } = useLocation()

  const selectedBgColor = useColorModeValue(
    'background.light',
    'background.dark'
  )
  const selectedColor = useColorModeValue('red.600', 'white')
  const normalColor = useColorModeValue('text.light', 'text.dark')

  return (
    <Button
      as={RouterLink}
      to={props.href}
      key={props.name}
      p={2}
      color={pathname === props.href ? selectedColor : normalColor}
      bg={pathname === props.href ? selectedBgColor : ''}
      onClick={props.onClick}
    >
      <Flex flexDir="row" alignItems="center">
        <Icon
          as={props.Icon}
          flexShrink={0}
          mr={3}
          w={6}
          h={6}
          aria-hidden="true"
          color={pathname === props.href ? 'red.600' : normalColor}
        />
        {props.name}
      </Flex>
    </Button>
  )
}

interface NavLinksProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

const NavLinks = (props: NavLinksProps) => (
  <>
    {navItems.map((item, i: number) => (
      <NavLink
        key={i.toString()}
        name={item.name}
        href={item.href}
        Icon={item.Icon}
        onClick={props.onClick}
      />
    ))}
  </>
)

export default NavLinks
