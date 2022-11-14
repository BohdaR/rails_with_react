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
      <ul className={style.reservationTable}>
        <li className={style.tableHeader}>
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
        </li>
        { Object.keys(reservations).length !== 0 ?
          reservations.map((item) =>
          <li className={style.tableRow} key={item.id}>
            <Reservation
              reservation={item}
              token={token}
            />
          </li>
        ) : <h1 className={style.headline}>There are no reservations</h1>}
      </ul>
    </div>
  );
};

export default ReservationsList;
