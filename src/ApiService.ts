import axios from 'axios'

import { Stream } from './types/api'

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const fetchTrending = async (region: string) => {
  const response = await apiClient.get<Stream[]>('/trending', {
    params: {
      region: region,
    },
  })
  return response.data
}

const ApiService = {
  fetchTrending,
}

export default ApiService
