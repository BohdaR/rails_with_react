import React, {useEffect, useState} from 'react';
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";
import {get} from "./useAPI/useAPI"


const Booking = ({defaultOffice, form_authenticity_token}) => {
  const [offices, setOffices] = useState([])
  const [roomList, setRoomList] = useState([])

  const [lookFromTime, setLookFromTime] = useState(Date.now())
  const [lookToTime, setLookToTime] = useState('')

  const [roomFloor, setRoomFloor] = useState('1')
  const [roomOfficeId, setRoomOfficeId] = useState(defaultOffice.id)

  useEffect(() => {
    get(`${process.env.HOST}/offices`)
      .then(
        (response) => {
          console.log(new Date(Date.now()))
          setOffices(response.data);
        })
  }, []);

  useEffect(() => {
    get(`${process.env.HOST}/rooms?floor=${roomFloor}&office_id=${roomOfficeId}`)
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
        token={form_authenticity_token}
      />
    </div>
  );
};

export default Booking;
