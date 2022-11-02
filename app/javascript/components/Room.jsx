import React, {useState} from 'react';
import PlacesList from "./PlacesList";
import style from '../stylesheets/booking.module.css'

const Room = ({room, ...props}) => {
  const [showRoomPlaces, setShowRoomPlaces] = useState(false)
  const [showRoom, setShowRoom] = useState(true)

  return (
    <div>
      {showRoom ? <div className={style.room}>
        <h1
          onClick={() => {
            setShowRoomPlaces(!showRoomPlaces);
          }}
          className={style.roomTitle}
        >
          {room.name}
        </h1>
        {showRoomPlaces ?
          <PlacesList
            roomId={room.id}
            setShowRoom={setShowRoom}
            {...props}
          /> : null
        }
      </div> : null
      }
    </div>
  );
};

export default Room;
