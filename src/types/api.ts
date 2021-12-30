/*
Piped API response types
 */

export type Suggestions = string[]

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

export type TrendingType = {
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
}[]

export type Channel = {
  id: string
  name: string
  avatarUrl?: string
  bannerUrl?: string
  description?: string
  nextpage?: string
  subscriberCount: number
  verified: boolean
  relatedStreams?: {
    url: string
    title: string
    thumbnail: string
    uploaderName: string
    uploaderUrl: string
    uploaderAvatar: null
    uploadedDate: string
    duration: number
    views: number
    uploaderVerified: boolean
  }[]
  // Channel API Errors (eg. Channel does not exist)
  error?: string
  message?: string
}

export type ChannelNextPage = {
  nextpage: string
  relatedStreams?: {
    url: string
    title: string
    thumbnail: string
    uploaderName: string
    uploaderUrl: string
    uploaderAvatar: null
    uploadedDate: string
    duration: number
    views: number
    uploaderVerified: boolean
  }[]
  error?: string
  message?: string
}
