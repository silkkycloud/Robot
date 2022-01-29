import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

/*
Recoil

Application settings store and defaults
 */

export const versionState = atom({
  key: 'versionState',
  default: '0.0.1',
})

export const apiUrlState = atom({
  key: 'apiUrlState',
  default: process.env.REACT_APP_API_URL,
  effects_UNSTABLE: [persistAtom],
})

export const regionState = atom({
  key: 'regionState',
  default: 'US',
  effects_UNSTABLE: [persistAtom],
})
