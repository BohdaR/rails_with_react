import React, {useEffect, useState} from 'react';
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";
import {get} from "./useAPI/useAPI"
import style from '../stylesheets/booking.module.css'


const Booking = ({defaultOffice, form_authenticity_token, currentDateTime, tomorrowDateTime}) => {
  const [offices, setOffices] = useState([]);
  const [floors, setFloors] = useState([]);
  const [roomList, setRoomList] = useState([]);

  const [lookFromTime, setLookFromTime] = useState(currentDateTime.substring(0, 16));
  const [lookToTime, setLookToTime] = useState(tomorrowDateTime.substring(0, 16));

  const [roomFloor, setRoomFloor] = useState("");
  const [roomOfficeId, setRoomOfficeId] = useState(defaultOffice.id);

  useEffect(() => {
    get(`${process.env.API_HOST}/offices`)
      .then(
        (response) => {
          setOffices(response.data);
        })
  }, []);

  useEffect(() => {
    get(`${process.env.API_HOST}/floors?look_from=${lookFromTime}&look_to=${lookToTime}`)
      .then(
        (response) => {
          setFloors(response.data);
          setRoomFloor(response.data.floor);
        })
  }, []);

  useEffect(() => {
    get(`${process.env.API_HOST}/rooms?floor=${roomFloor}&office_id=${roomOfficeId}&look_from=${lookFromTime}&look_to=${lookToTime}`)
      .then(
        (response) => {
          setRoomList(response.data);
        })
  }, [roomFloor, roomOfficeId, lookFromTime, lookToTime]);

  return (
    <div className={style.bookingWrapper}>
      <RoomsFilter
        offices={offices}
        floors={floors}
        defaultOffice={roomOfficeId}
        defaultFloor={roomFloor}
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
