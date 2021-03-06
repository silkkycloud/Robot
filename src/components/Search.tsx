import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import useKeyPress from '../hooks/useKeyPress'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Center,
  Stack,
  Box,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'

import axios from 'axios'

import { apiUrlState } from '../state'

import { SuggestionsType } from '../types/api'

export const useFetchSuggestions = (
  query: string
): [SuggestionsType, boolean] => {
  const apiUrl = useRecoilValue(apiUrlState)
  const [data, setData] = useState<SuggestionsType>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true

    const ac = new AbortController()

    const fetchSuggestions = () => {
      if (isMounted) setLoading(true)
      axios
        .get(apiUrl + '/suggestions', {
          signal: ac.signal,
          params: {
            query: query,
          },
        })
        .then((res) => {
          if (isMounted) {
            setData(res.data)
            setLoading(false)
          }
        })
        .catch((error) => {
          if (isMounted) setLoading(false)
          console.log(error)
        })
    }

    if (query != '') fetchSuggestions()
    else setData([])
    return () => {
      ac.abort()
      isMounted = false
    }
  }, [query, apiUrl])

  return [data, loading]
}

interface SearchProps {
  isSearchOpen: boolean
  onSearchClose: () => void
}

const Search = (props: SearchProps) => {
  const cursorBgColor = useColorModeValue('background.light', 'background.dark')

  const [value, setValue] = useState('')
  const [cursor, setCursor] = useState<number>()

  const downPress = useKeyPress('ArrowDown')
  const upPress = useKeyPress('ArrowUp')

  const [suggestionsResults] = useFetchSuggestions(value)

  // Handle arrow down
  useEffect(() => {
    if (suggestionsResults.length && downPress) {
      setCursor((prevState) => {
        if (prevState != undefined)
          if (prevState < suggestionsResults.length - 1) return prevState + 1
          else return prevState
        else setCursor(0)
      })
    }
  }, [downPress, suggestionsResults.length])
  // Handle arrow up
  useEffect(() => {
    if (suggestionsResults.length && upPress) {
      setCursor((prevState) => {
        if (prevState != undefined)
          if (prevState > 0) return prevState - 1
          else setCursor(undefined)
      })
    }
  }, [upPress, suggestionsResults.length])

  const suggestions = suggestionsResults.map(
    (suggestion: string, i: number) => (
      <Box
        key={i.toString()}
        onMouseEnter={() => setCursor(i)}
        onMouseLeave={() => setCursor(undefined)}
        cursor="pointer"
        bg={i === cursor ? cursorBgColor : ''}
        px={{ base: 3, sm: 2 }}
        py={{ base: 3, sm: 2 }}
        rounded="md"
      >
        {suggestion}
      </Box>
    )
  )

  return (
    <Modal
      isOpen={props.isSearchOpen}
      onClose={props.onSearchClose}
      size={useBreakpointValue({ base: 'full', sm: 'lg' })}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent p={{ base: 4, sm: 0 }}>
        <ModalCloseButton display={{ sm: 'none' }} />
        <ModalHeader>
          <Center>Search</Center>
        </ModalHeader>
        <ModalBody pb={{ sm: 5 }}>
          <Input
            variant="filled"
            size="lg"
            focusBorderColor="red.600"
            value={value}
            onChange={(q) => setValue(q.target.value)}
          />
          <Stack mt={1} spacing={1}>
            {suggestions}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default Search
