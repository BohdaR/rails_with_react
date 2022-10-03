import React, {useEffect, useState} from 'react';
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";
import axios from "axios";

const Booking = () => {
    const [offices, setOffices] = useState([])
    const [roomList, setRoomList] = useState([])

    const [roomFloor, setRoomFloor] = useState('1')
    const [roomOfficeId, setRoomOfficeId] = useState('1')

    useEffect(() => {
        axios.get('http://127.0.0.1:3000/offices')
            .then(
                (response) => {
                    setOffices(response.data);
                })
    }, []);

    useEffect(() => {
        axios.get(`http://127.0.0.1:3000/rooms?floor=${roomFloor}&office_id=${roomOfficeId}`)
            .then(
                (response) => {
                    setRoomList(response.data);
                })
    }, [roomFloor, roomOfficeId]);

    return (
        <div>
            <RoomsFilter
                offices={offices}
                floorOnChange={setRoomFloor}
                office_idOnChange={setRoomOfficeId}
            />
            <RoomsList roomsList={roomList}/>
        </div>
    );
};

export default Booking;
