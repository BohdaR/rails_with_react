import React, {useState} from 'react';
import PlacesList from "./PlacesList";

const Room = ({room, ...props}) => {
  const [showRoomPlaces, setShowRoomPlaces] = useState(false)

  return (
    <div>
      <h1 onClick={() => setShowRoomPlaces(true)}>{room.name}</h1>
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
