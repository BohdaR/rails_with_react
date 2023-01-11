import React, {useState} from 'react';
import style from '../stylesheets/booking.module.css'
import RoomPicture from "./RoomPicture";

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
          <RoomPicture
            roomId={room.id}
            image={room.image_url}
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
