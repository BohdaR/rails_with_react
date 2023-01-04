import React, {Fragment, useState} from 'react';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {Alert, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import moment from "moment";
import {bookPlace} from "./useAPI/useAPI";
import ReservationConfirmation from "./ReservationConfirmation";

const RebookButton = ({token, placeId, placeNumber}) => {
  const [startDate, setStartDate] = useState(moment().utcOffset(2).format().substring(0, 16));
  const [endDate, setEndDate] = useState(moment().add(1, 'd').utcOffset(2).format().substring(0, 16));
  const [open, setOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const confirmationMessage = `
  Are you sure you want to book 
  a seat number ${placeNumber} 
  from ${startDate.replace('T', ' ')} to ${endDate.replace('T', ' ')}?
  `;

  const handleBookPlace = () => {
    setErrors({})
    bookPlace(token, startDate, endDate, placeId)
      .then(
        (response) => {
          setOpen(false)
          setConfirmationOpen(false)
          setErrors({})
        })
      .catch(
        (errors) => {
          setErrors(errors.response.data)
        }
      );
  }

  const handleSubmit = () => {
    setErrors({})
    bookPlace(token, startDate, endDate, placeId)
      .then(
        (response) => {
          setOpen(false)
          setErrors({})
        })
      .catch(
        (errors) => {
          console.log(errors)
          setErrors(errors.response.data)
        }
      );
  }

  return (
    <Fragment>
      <Button onClick={() => {
        setOpen(true);
        setErrors({});
      }} variant="outlined">Rebook</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Book a place</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Start date"
            value={startDate}
            type="datetime-local"
            fullWidth
            variant="outlined"
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Start date"
            value={endDate}
            type="datetime-local"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => {
            setConfirmationOpen(true);
            setOpen(false);
          }}>Book</Button>
        </DialogActions>
      </Dialog>
      <ReservationConfirmation
        open={confirmationOpen}
        setOpen={setConfirmationOpen}
        errors={errors}
        setErrors={setErrors}
        confirmationMessage={confirmationMessage}
        handleSuccess={handleBookPlace}
      />
    </Fragment>
  );
};

export default RebookButton;
