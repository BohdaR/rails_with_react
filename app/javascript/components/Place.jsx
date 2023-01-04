import React, {useState} from 'react';
import {post} from "./useAPI/useAPI";
import style from '../stylesheets/booking.module.css'
import ReservationConfirmation from "./ReservationConfirmation";

const Place = ({place, token, start_at, end_at, setShowRoom}) => {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [showPlace, setShowPlace] = useState(true);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});


  const confirmationMessage = `
  Are you sure you want to book 
  a seat number ${place.number} 
  from ${start_at.replace('T', ' ')} to ${end_at.replace('T', ' ')}?
  `;

  const handleModal = () => {
    setOpen(!open);
    setConfirmationOpen(true);
    setErrors({});
  }

  const bookPlace = () => {

    post(`${process.env.API_HOST}/reservations`, {
      authenticity_token: token,
      reservation: {
        start_at: start_at,
        end_at: end_at,
        place_id: place.id
      }
    }).then((response) => {
      setShowPlace(false)
      if (document.getElementsByClassName(style.bookingButton).length === 1) setShowRoom(false)
    }).catch(
      (errors) => {
        setErrors(errors.response.data)
      }
    );
  }

  return (
    <div className={style.place}>
      {
        showPlace ?
          <div>
            <button className={style.bookingButton} onClick={handleModal}>
              {place.number}
            </button>
            <ReservationConfirmation
              open={confirmationOpen}
              setOpen={setConfirmationOpen}
              errors={errors}
              setErrors={setErrors}
              confirmationMessage={confirmationMessage}
              handleSuccess={bookPlace}
            />
          </div> : null
      }
    </div>
  )
};

export default Place;
