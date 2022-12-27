import React, {useState, useEffect} from "react";
import axios from "axios";
import {get} from "./useAPI/useAPI";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import style from "../stylesheets/reservations.module.css";
import RebookButton from "./RebookButton";

const FavoritePlaces = ({token}) => {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    get(`${process.env.HOST}/favorites`)
      .then(
        (response) => {
          setFavorites(response.data);
        })
  }, []);

  const onFavoriteDelete = async (id) => {
    try {
      await axios.delete(`${process.env.HOST}/favorites/${id}`);
      const del = favorites.filter((favorite) => id !== favorite.id);
      setFavorites(del);
    } catch (err) {
      console.error(err);
    }
  };

  const list = favorites.map(favorite => {
    return (
      <div className={style.tableRow}>
        <div className={`${style.placeColumn} ${style.col}`}
             data-label="Room">
          {favorite.place.room.name}
        </div>
        <div className={`${style.placeColumn} ${style.col}`}
             data-label="Place">
          Place {favorite.place.number}
        </div>
        <div className={`${style.btnColumn} ${style.col}`}>
          <RebookButton
            token={token}
            placeId={favorite.place_id}
            placeNumber={favorite.place_number}
          />
          <IconButton onClick={() => onFavoriteDelete(favorite.id)}>
            <DeleteIcon style={{
              color: "#173166"
            }}/>
          </IconButton>
        </div>
      </div>
    );
  });

  return (
    <div>
      <h1 className={style.headline}>Favorite places</h1>
      {Object.keys(favorites).length !== 0 ?
        <div className={style.reservationTable}>
          <div className={style.tableHeader}>
            <div className={`${style.placeColumn} ${style.col}`}>
              Room Name
            </div>
            <div className={`${style.startColumn} ${style.col}`}>
              Place Number
            </div>
            <div className={`${style.btnColumn} ${style.col}`}></div>
          </div>
          {list}
        </div>
        : <h1 className={style.headline}>There are no any favorites</h1>
      }
    </div>
  );
}

export default FavoritePlaces;
