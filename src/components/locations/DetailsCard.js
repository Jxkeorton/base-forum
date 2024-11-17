import React from 'react'
const DetailsCard = ({location}) => {
  return (
    <div>
      <h1>{location.name}</h1>
      <p>Opened by: {location.opened_by}</p>
      <p>Date opened: {location.date_opened}</p>
      {/* <img src={location.image} alt={location.name} style={{ width: '500px' }} /> */}
      <p>Country: {location.country}</p>
      <p>Rock Drop: {location.rock_drop} feet</p>
      <p>Access: {location.access}</p>
    </div>
  )
}
export default DetailsCard