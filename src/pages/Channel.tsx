import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

const Channel = () => {
  const { pathname } = useLocation()
  const basePath = pathname.split('/')[1]
  const { id } = useParams()

  return (
    <div>
      <p>{basePath}</p>
      <p>{id}</p>
    </div>
  )
}

export default Channel
