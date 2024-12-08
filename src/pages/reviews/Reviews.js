import React from 'react'
import ReviewsList from '../../components/reviews/ReviewsList'
const Reviews = () => {
  return (
    <div>
      <ReviewsList filter={{ ordering: '-created_at' }} />
    </div>
  )
}

export default Reviews