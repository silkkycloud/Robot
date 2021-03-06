/*
Piped API response types
 */

export type SuggestionsType = string[]

export type Stream = {
  url: string
  title: string
  thumbnail: string
  uploaderName: string
  uploaderUrl: string
  uploaderAvatar: string
  uploadedDate: string
  duration: number
  views: number
  uploaderVerified: boolean
}

export type Search = {
  items?: {
    url: string
    name: string
    title: string
    thumbnail: string
    description: string
    uploaderName: string
    uploaderUrl: string
    uploaderAvatar: string
    uploadedDate: string
    duration: number
    subscribers: number
    videos: number
    views: number
    verified: boolean
    uploaderVerified: boolean
  }[]
  nextpage: string
  suggestion?: string
  corrected: boolean
  error?: string
  message?: string
}

export type ChannelType = {
  id: string
  name: string
  avatarUrl?: string
  bannerUrl?: string
  description?: string
  nextpage?: string
  subscriberCount: number
  verified: boolean
  relatedStreams?: Stream[]
  // Channel API Errors (eg. Channel does not exist)
  error?: string
  message?: string
}
