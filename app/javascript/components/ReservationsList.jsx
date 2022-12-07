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
      <h1 className={style.headline}>Your reservations</h1>
      { Object.keys(reservations).length !== 0 ?
        <div className={style.reservationTable}>
          <div className={style.tableHeader}>
            <div className={ `${style.placeColumn} ${style.col}`}>
              Room Name / Place Number
            </div>
            <div className={`${style.startColumn} ${style.col}`}>
              Start At
            </div>
            <div className={`${style.endColumn} ${style.col}`}>
              End At
            </div>
            <div className={`${style.btnColumn} ${style.col}`}></div> 
          </div>
          {reservations.map((item) =>
            <Reservation
              key={item.id}
              reservation={item}
              token={token}
            />
          )}
        </div>
        : <h1 className={style.headline}>There are no reservations</h1>
      }
    </div>
  );
};

export default ReservationsList;
