import React from 'react';
import Room from "./Room";

const RoomsList = ({roomsList, ...props}) => {
  return (
    <div>
      {roomsList.map((room) =>
        <Room
          key={room.id}
          room={room}
          {...props}
        />
      )}
    </div>
  );
};

export default RoomsList;
