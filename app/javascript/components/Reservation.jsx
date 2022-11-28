import React, {useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import style from '../stylesheets/reservations.module.css'
import {deleteRequest, post} from "./useAPI/useAPI";
import "../stylesheets/favorite_places.css";


const Reservation = ({reservation, token}) => {
  const [showReservation, setShowReservation] = useState(true);
  const [favorited, setFavorited] = useState(false);

  const dateHandler = (dateString) => {
    let date = new Date(dateString)
    return `${date.toDateString()} ${date.toTimeString().substring(0, 5)}`
  }

  const deleteReservation = (reservation_id) => {
    deleteRequest(`${process.env.HOST}/reservations/${reservation_id}?authenticity_token=${token}`)
      .then(
        (response) => {
          setShowReservation(false)
        }
      )
  }

  const onfavoritedClick = () => {
    if (!favorited) {
		post(`${process.env.HOST}/favorites`, {
			authenticity_token: token,
			favorite: {
				place_id: reservation.place_id
			}
			}).then(
			(response) => {
        console.log(response.data);
				setFavorited(prev => !prev);
        alert( `Place ${reservation.place_number} successfully added to favorites.`)
			});
    }
	}

  return (
    showReservation ?
      <div className={style.reservation}>
        <div>{reservation.room_name} place {reservation.place_number}</div>
        <div>{dateHandler(reservation.start_at)}</div>
        <div>{dateHandler(reservation.end_at)}</div>
        <div>
        {!favorited ? (
          <button className="button-13" onClick={onfavoritedClick}>
            Add to favorite
          </button>
        ) : (
          <button>
            Delete from favorite
          </button>
        )} 
        </div>
        <div>
          <IconButton onClick={() => deleteReservation(reservation.id)}>
            <DeleteIcon style={{
              color: "#FAFBFC"
            }}/>
          </IconButton>
        </div>
      </div> : null
  );
};

export default Reservation;
