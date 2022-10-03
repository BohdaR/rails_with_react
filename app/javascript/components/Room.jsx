import React, {useEffect, useState} from 'react';
import PlacesList from "./PlacesList";
import {get} from "./useAPI/useAPI"

const Room = ({room, lookFromTime, lookToTime}) => {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    get(`${process.env.HOST}/rooms/${room.id}/places?look_from=${lookFromTime}&look_to=${lookToTime}`)
      .then(
        (response) => {
          setPlaces(response.data)
        })
  }, [lookFromTime, lookFromTime])

  return (
    <div>
      <h1>{room.name}</h1>
      <PlacesList placesList={places}/>
    </div>
  );
};

export default Room;
