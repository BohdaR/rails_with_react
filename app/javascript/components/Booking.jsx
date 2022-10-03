import React, {useEffect, useState} from 'react';
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";
import axios from "axios";

const Booking = ({defaultOffice}) => {
    const host = 'http://127.0.0.1:3000'

    const [offices, setOffices] = useState([])
    const [roomList, setRoomList] = useState([])

    const [lookFromTime, setLookFromTime] = useState('')
    const [lookToTime, setLookToTime] = useState('')

    const [roomFloor, setRoomFloor] = useState('1')
    const [roomOfficeId, setRoomOfficeId] = useState(defaultOffice.id)

    useEffect(() => {
        axios.get(`${host}/offices`)
            .then(
                (response) => {
                    setOffices(response.data);
                })
    }, []);

    useEffect(() => {
        axios.get(`${host}/rooms?floor=${roomFloor}&office_id=${roomOfficeId}`)
            .then(
                (response) => {
                    setRoomList(response.data);
                })
    }, [roomFloor, roomOfficeId]);

    return (
        <div>
            <RoomsFilter
                offices={offices}
                defaultOffice={roomOfficeId}
                onChangeFloor={setRoomFloor}
                onChangeOfficeId={setRoomOfficeId}
                onChangeLookFromTime={setLookFromTime}
                onChangeLookToTime={setLookToTime}
            />
            <RoomsList
                roomsList={roomList}
                lookFromTime={lookFromTime}
                lookToTime={lookToTime}
            />
        </div>
    );
};

export default Booking;
