import React, {useState} from 'react';
import {post} from "./useAPI/useAPI";
import style from '../stylesheets/booking.module.css'

const Place = ({place, token, start_at, end_at, setShowRoom}) => {
  const [showPlace, setShowPlace] = useState(true)
  const [error, setError] = useState(null)
  const confirmationMessage = `
  Are you sure you want to book 
  a seat number ${place.number} 
  from ${start_at.replace('T', ' ')} to ${end_at.replace('T', ' ')}
  `

  const bookPlace = () => {
    if (start_at > end_at) {
      setError('end date must be greater than start date')
      return
    }

    post(`${process.env.HOST}/reservations`, {
      authenticity_token: token,
      reservation: {
        start_at: start_at,
        end_at: end_at,
        place_id: place.id
      }
    }).then((response) => {
      setShowPlace(false)
      console.log(document.getElementsByTagName('button').length)
      if (document.getElementsByTagName('button').length === 1) setShowRoom(false)
    })
  }

  return (
    <div className={style.place}>
      {
        showPlace ?
          <div>
            <button className={style.bookingButton} onClick={() => {
              if (confirm(confirmationMessage)) bookPlace()
            }}>
              Book a place {place.number}
            </button>
            <h2>{error}</h2>
          </div> : null
      }
    </div>
  )
};

export default Place;
