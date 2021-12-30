import React, { useContext } from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import { NavContext } from './Nav'

const Search = () => {
  const nav = useContext(NavContext)

  return (
    <Modal isOpen={nav.isSearchOpen} onClose={nav.onSearchClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>df</ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default Search
