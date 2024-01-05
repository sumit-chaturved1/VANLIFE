import React from 'react'
import { useRouteError } from 'react-router-dom'

function Error() {
  const error = useRouteError()
  return (
    <div>
      <h1>Error: {error.message}</h1>
      <h4>{error.status} - {error.statusText}</h4>
    </div>
  )
}

export default Error