import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <p>404 Not Found</p>
      <Link to="/">Go Back to Homepage</Link>
    </div>
  )
}

export default NotFound