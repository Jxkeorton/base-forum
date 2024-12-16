import React from 'react'
import ReviewsList from '../../components/reviews/ReviewsList.jsx'
const Reviews = () => {
  return (
    <div>
      <ReviewsList filter={{ ordering: '-created_at' }} />
    </div>
  )
}

export default Reviews