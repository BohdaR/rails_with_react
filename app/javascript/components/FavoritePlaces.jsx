import React, { useState, useEffect } from "react";
import axios from "axios";
import {get} from "./useAPI/useAPI";
import "../stylesheets/favorite_places.css";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


const FavoritePlaces = () => {
 
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    get(`${process.env.HOST}/favorites`)
      .then(
        (response) => {
          setFavorites(response.data);
        })
  }, []);

  const onFavoriteDelete = async ({ id }) => {
    try {
      const resp = await axios.delete(`${process.env.HOST}/favorites/${id}`)
      console.log(resp.data);
      const del = favorites.filter((favorite) => id !== favorite.id);
      setFavorites(del);
    } catch (err) {
      console.error(err);
    }
  };

  const list = favorites.map(favorite => {
  return (
    <div className="favorite-list">
      <li key={favorite.id}>Place Number: {favorite.place.number }</li>
      <IconButton onClick={onFavoriteDelete}>
                <DeleteIcon style={{
                    color: "#FAFBFC"
                  }} />
      </IconButton>
    </div>
    );
  });

  return(
    <div className="favorites">
      <h1>Favorite Places</h1>
      { Object.keys(favorites).length !== 0
        ? <div>
            <ul>
              {list}
            </ul>
          </div>
        : <h1>There is no favorite places</h1>
      }
    </div>
  );
}

export default FavoritePlaces;
