import React from 'react';
import Room from "./Room";
import style from '../stylesheets/booking.module.css'

const RoomsList = ({roomsList, ...props}) => {
  return (
    <div className={style.roomsList}>
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
