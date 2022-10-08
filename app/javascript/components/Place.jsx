import React, {useState} from 'react';
import {post} from "./useAPI/useAPI";

const Place = ({place, token, start_at, end_at}) => {
  const [showPlace, setShowPlace] = useState(true)
  const [error, setError] = useState(null)
  const confirmationMessage = `
  Are you sure you want to book 
  seat number ${place.number} 
  from ${start_at.replace('T', ' ')} 
  to ${end_at.replace('T', ' ')}
  `

  const bookPlace = () => {
    if (start_at > end_at) {
      setError('end date must be greater than start date')
      return
    }
    setShowPlace(false)

    post(`${process.env.HOST}/reservations`, {
      authenticity_token: token,
      reservation: {
        start_at: start_at,
        end_at: end_at,
        place_id: place.id
      }
    }).then((response) => {
      console.log(response)
    }).then((errors) => {
      console.log(errors)
    })
  }

  return (
    <div>
      {
        showPlace ?
          <div>
            <button onClick={() => {
              if (confirm(confirmationMessage)) bookPlace()
            }}>
              Book a {place.number} place
            </button>
            <h2>{error}</h2>
          </div> : null
      }
    </div>
  )
};

export default Place;
