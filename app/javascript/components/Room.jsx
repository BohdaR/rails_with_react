import React, {useEffect, useState} from 'react';
import axios from "axios";
import PlacesList from "./PlacesList";

const Room = ({room, lookFromTime, lookToTime}) => {
    const [places, setPlaces] = useState([])

    useEffect(() => {
        axios.get(`http://127.0.0.1:3000/rooms/${room.id}/places?look_from=${lookFromTime}&look_to=${lookToTime}`)
            .then(
                (response) => {
                    setPlaces(response.data)
                })
    }, [lookFromTime, lookFromTime])

    return (
        <div>
            <h1>{room.name}</h1>
            <PlacesList placesList={places} />
        </div>
    );
};

export default Room;
