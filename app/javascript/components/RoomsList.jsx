import React from 'react';
import Room from "./Room";

const RoomsList = ({roomsList}) => {
    return (
        <div>
            {roomsList.map((room) =>
                <Room key={room.id} name={room.name}/>
            )}
        </div>
    );
};

export default RoomsList;
