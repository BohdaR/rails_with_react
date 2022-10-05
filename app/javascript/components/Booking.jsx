import React, {useEffect, useState} from 'react';
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";
import {get} from "./useAPI/useAPI"


const Booking = ({defaultOffice, form_authenticity_token}) => {
  const [offices, setOffices] = useState([])
  const [roomList, setRoomList] = useState([])


  const today = new Date(Date.now())
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
  const [lookFromTime, setLookFromTime] = useState(today.toISOString().substring(0, 16))
  const [lookToTime, setLookToTime] = useState(tomorrow.toISOString().substring(0, 16))

  const [roomFloor, setRoomFloor] = useState('1')
  const [roomOfficeId, setRoomOfficeId] = useState(defaultOffice.id)

  useEffect(() => {
    get(`${process.env.HOST}/offices`)
      .then(
        (response) => {
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
        lookToTime={lookToTime}
        lookFromTime={lookFromTime}
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
