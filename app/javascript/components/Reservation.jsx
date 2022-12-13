import React, {useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import style from '../stylesheets/reservations.module.css'
import { deleteRequest, post, get } from "./useAPI/useAPI";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import "../stylesheets/favorite_places.css";


const Reservation = ({reservation, token}) => {
  const [showReservation, setShowReservation] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [favorited, setFavorited] = useState(false);

  const dateHandler = (dateString) => {
    let date = new Date(dateString)
    return `${date.toDateString()} ${date.toTimeString().substring(0, 5)}`
  }

  useEffect(() => {
    get(`${process.env.HOST}/favorites`)
      .then(
        (response) => {
          console.log(response.data)
          setFavorites(response.data);
        })
  }, []);

  const deleteReservation = (reservation_id) => {
    deleteRequest(`${process.env.HOST}/reservations/${reservation_id}?authenticity_token=${token}`)
      .then(
        (response) => {
          setShowReservation(false);
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
        console.log(favorited);
        alert( `Place ${reservation.place_number} successfully added to favorites.`);
			});
    }
	}

  return (
    showReservation ?
      <div className={style.tableRow}>
        <div className={ `${style.placeColumn} ${style.col}`} 
          data-label="Room / Place">
          {reservation.room_name}, place {reservation.place_number}
        </div>
        <div className={`${style.startColumn} ${style.col}`} 
          data-label="Start At">
          {dateHandler(reservation.start_at)}
        </div>
        <div className={`${style.endColumn} ${style.col}`} 
          data-label="End At">
          {dateHandler(reservation.end_at)}
        </div>
        <div className={`${style.btnColumn} ${style.col}`}>
          {!favorited ? (
            <FavoriteBorderIcon
              onClick={onfavoritedClick}
              style={{
                color: "#173166"
            }}/>
          ) : (
            <FavoriteIcon 
              style={{
              color: "#173166"
            }}/>
          )} 
          <IconButton onClick={() => deleteReservation(reservation.id)}>
            <DeleteIcon style={{
              color: "#173166"
            }}/>
          </IconButton>
        </div> 
      </div>: null
  );
};

export default Reservation;
