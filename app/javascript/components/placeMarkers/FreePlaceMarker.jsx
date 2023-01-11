import React, {Fragment, useState} from 'react';
import {post} from "../useAPI/useAPI";
import ReservationConfirmation from "../ReservationConfirmation";
import {Avatar, Box} from "@mui/material";

const FreePlaceMarker = ({place, token, start_at, end_at, width, height, radius, available, setPlaces}) => {
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
          setPlaces();
          setConfirmationOpen(false);
        }
      )
      .catch(
        (errors) => {
          setErrors(errors.response.data)
        }
      );
  }

  return (
    <Fragment>
      <Box
        key={place.id}
        onClick={available ? handleModal : null}
        sx={{
          position: "absolute",
          zIndex: "2",
          left: place.x * width - width * radius / 2,
          top: place.y * height - width * radius / 2,
        }}>
        <Avatar
          sx={{
            cursor: "pointer",
            height: width * radius,
            width: width * radius,
            fontSize: width * radius * 0.6,
          }}
        />
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

export default FreePlaceMarker;
