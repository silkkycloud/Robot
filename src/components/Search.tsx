import React from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

export interface SearchProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const Search = (props: SearchProps) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
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
