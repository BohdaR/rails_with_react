import React, {useState} from 'react';
import PlacesList from "./PlacesList";
import style from '../stylesheets/booking.module.css'

const Room = ({room, ...props}) => {
  const [showRoomPlaces, setShowRoomPlaces] = useState(false)

  return (
    <div className={style.room}>
      <h1
        onClick={() => setShowRoomPlaces(!showRoomPlaces)}
        className={style.roomTitle}
      >
        {room.name}
      </h1>
      {showRoomPlaces ?
        <PlacesList
          roomId={room.id}
          {...props}
        /> : null
      }
    </div>
  );
};

export default Room;
