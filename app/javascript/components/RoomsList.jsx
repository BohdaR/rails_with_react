import React from 'react';
import Room from "./Room";

const RoomsList = ({roomsList, lookFromTime, lookToTime}) => {
  return (
    <div>
      {roomsList.map((room) =>
        <Room
          key={room.id}
          room={room}
          lookFromTime={lookFromTime}
          lookToTime={lookToTime}
        />
      )}
    </div>
  );
};

export default RoomsList;
