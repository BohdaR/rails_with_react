import React, { useState, useEffect } from "react";
import axios from "axios";
import {get} from "./useAPI/useAPI";
import "../stylesheets/favorite_places.css";
import { AiOutlineDelete } from "react-icons/ai";


const FavoritePlaces = (favoriteId) => {
 
 const [favorites, setfavorites] = useState([]);

 useEffect(() => {
    get(`${process.env.HOST}/favorites`)
      .then(
        (response) => {
          setfavorites(response.data);
        })
  }, []);

  const onFavoriteDelete = async () => {
    try {
        const resp = await axios.delete(`${process.env.HOST}/favorites/${favoriteId}`)
        console.log(resp.data);
    } catch (err) {
        console.error(err);
    }
  };

 const list = favorites.map(favorite => {
  return (<li key={favorite.id}>Place Number: {favorite.place.number}</li>)
 })

  return(
    <div className="favorites">
      <h1>Favorite Places</h1>
      <div className="favorite-list">
        <ul>
          {list}
          <button className="del_favorite"
          onClick={onFavoriteDelete}>Delete from favorite</button>
          <AiOutlineDelete />
        </ul>
      </div>
    </div>
  );
}

export default FavoritePlaces;
