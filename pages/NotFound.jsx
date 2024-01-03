import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='not-found' >
      <h1>Sorry, The page you were looking for was not found</h1>
      <Link to="/" className='link-button' > Return to Home </Link>
    </div>
  )
}

export default NotFound