import React, {Fragment, useState} from 'react';
import {post} from "./useAPI/useAPI";
import ReservationConfirmation from "./ReservationConfirmation";
import {Avatar, Box} from "@mui/material";
import style from '../stylesheets/booking.module.css'
import {deepOrange} from "@mui/material/colors";

const Place = ({place, token, start_at, end_at, width, height, radius, available}) => {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});


  const confirmationMessage = `
  Are you sure you want to book 
  a seat number ${place.number} 
  from ${start_at.replace('T', ' ')} to ${end_at.replace('T', ' ')}?
  `;

  const handleModal = () => {
    setOpen(!open);
    setConfirmationOpen(true);
    setErrors({});
  }

  const bookPlace = () => {
    post(`${process.env.API_HOST}/reservations`, {
      authenticity_token: token,
      reservation: {
        start_at: start_at,
        end_at: end_at,
        place_id: place.id
      }
    })
      .then(
        () => {
          setConfirmationOpen(false);
        }
      )
      .catch(
        (errors) => {
          setErrors(errors.response.data)
        }
      );
  }

  const markStyles = {
    height: width * radius,
    width: width * radius,
    fontSize: width * radius * 0.6,
  }


  return (
    <Fragment>
      <Box
        key={place.id}
        className={available ? style.available : null}
        onClick={available ? handleModal : null}
        sx={{
          position: "absolute",
          zIndex: "2",
          left: place.x * width - width * radius / 2,
          top: place.y * height - width * radius / 2,
        }}>
        <Avatar
          alt={place.user_full_name}
          title={place.user_full_name}
          src={place.user_avatar_url}
          sx={
            available ? markStyles :
              {
                ...markStyles,
                bgcolor: deepOrange[500]
              }
          }
        >{place.user_email ? place.user_email.charAt(0) : null}</Avatar>
      </Box>
      <ReservationConfirmation
        open={confirmationOpen}
        setOpen={setConfirmationOpen}
        errors={errors}
        setErrors={setErrors}
        confirmationMessage={confirmationMessage}
        handleSuccess={bookPlace}
      />
    </Fragment>
  )
};

export default Place;
