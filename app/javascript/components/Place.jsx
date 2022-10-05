import React, {useState} from 'react';
import {post} from "./useAPI/useAPI";

const Place = ({place, token, start_at, end_at}) => {
  const [showPlace, setShowPlace] = useState(true)

  const bookPlace = () => {
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
    })
  }

  return (
    <div>
      {
        showPlace ?
          <button onClick={() => {if (confirm('Are you sure?')) bookPlace()}}>
            Book a {place.number} place
          </button> : null
      }
    </div>
  )
};

export default Place;
