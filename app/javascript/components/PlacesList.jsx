import React, {useEffect, useState, Fragment} from 'react';
import Place from "./Place";
import {get} from "./useAPI/useAPI";
import style from '../stylesheets/booking.module.css'

const PlacesList = ({roomId, lookFromTime, lookToTime, ...props}) => {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    get(`${process.env.HOST}/rooms/${roomId}/places?look_from=${lookFromTime}&look_to=${lookToTime}`)
      .then(
        (response) => {
          setPlaces(response.data)
        })
  }, [lookFromTime, lookToTime])

  return (
    <Fragment>
      <div className={style.lineContainer}>
        <hr className={style.horTopLine} />
      </div>
      <div className={style.placesList}>
        {places.map((place) =>
          <Place
            key={place.id}
            place={place}
            start_at={lookFromTime}
            end_at={lookToTime}
            {...props}
          />
        )}
      </div>
      <div className={style.lineContainer}>
        <hr className={style.horLine} />
      </div>
    </Fragment>
  )
};

export default PlacesList;
