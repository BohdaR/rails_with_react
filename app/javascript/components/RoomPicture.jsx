import React, {Fragment, useEffect, useRef, useState} from 'react';
import {get} from "./useAPI/useAPI";
import PlaceMarkers from "./PlaceMarkers";
import style from "../stylesheets/booking.module.css";

const RoomPicture = ({roomId, lookFromTime, lookToTime, image,...props}) => {
  const [places, setPlaces] = useState([])
  const [bookedPlaces, setBookedPlaces] = useState([])

  const imageRef = useRef(null);

  const [dimensions, setDimensions] = useState({
    width: 100,
    height: 100,
  });
  const handleResize = () => {
    setDimensions({
      width: imageRef.current.width,
      height: imageRef.current.height,
    });
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  useEffect(() => {
    get(`${process.env.API_HOST}/rooms/${roomId}/places?look_from=${lookFromTime}&look_to=${lookToTime}`)
      .then(
        (response) => {
          setPlaces(response.data)
        })
    get(`${process.env.API_HOST}/rooms/${roomId}/places?look_from=${lookFromTime}&look_to=${lookToTime}&booked=true`)
      .then(
        (response) => {
          setBookedPlaces(response.data)
        })
  }, [lookFromTime, lookToTime])
  return (
    <Fragment>
      <div
        style={{
          position: "relative",
          margin: "0 auto",
        }}
      >
        <PlaceMarkers
          height={dimensions.height}
          width={dimensions.width}
          freePlaces={places}
          bookedPlaces={bookedPlaces}
          start_at={lookFromTime}
          end_at={lookToTime}
          {...props}
        />
        <img
          onClick={
            (e) => console.log([[(e.clientX - imageRef.current.x) / imageRef.current.width, (e.clientY - imageRef.current.y) / imageRef.current.height]])
          }
          onLoad={handleResize}
          ref={imageRef}
          src={image}
          alt="room"
          className={style.roomPicture}
        />
      </div>
    </Fragment>
  );
};

export default RoomPicture;
