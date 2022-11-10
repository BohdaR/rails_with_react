import React, {useEffect, useState} from 'react';
import {get} from "./useAPI/useAPI";
import Reservation from "./Reservation";
import style from "../stylesheets/reservations.module.css"

const ReservationsList = ({token}) => {
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    get(`${process.env.HOST}/reservations`)
      .then(
        (response) => {
          setReservations(response.data)
        })
  }, [])

  return (
    <div>
      <h1 className={style.headline}>Your reservation</h1>
      { Object.keys(reservations).length !== 0 ?
        reservations.map((item) =>
        <Reservation
          key={item.id}
          reservation={item}
          token={token}
        />
      ) : <h1 className={style.headline}>There are no reservation</h1>}
    </div>
  );
};

export default ReservationsList;
