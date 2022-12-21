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
          setErrors(errors.response.data)
        }
      );
  }

  return (
    <Fragment>
      <Button onClick={() => setOpen(true)} variant="outlined">Rebook</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Book a place</DialogTitle>
        <DialogContent>
          {errors.start_at ?
            <Alert severity="error" onClose={() => {
              setErrors({start_at: null, place_id: errors.place_id, end_at: errors.end_at})
            }} style={{marginBottom: 10}}>
              Start date {errors.start_at} <br/>
            </Alert> : null
          }
          {errors.place_id ?
            <Alert severity="error" onClose={() => {
              setErrors({start_at: errors.start_at, place_id: null, end_at: errors.end_at})
            }} style={{marginBottom: 10}}>
              Place {errors.place_id}
            </Alert> : null
          }
          {errors.end_at ?
            <Alert severity="error" onClose={() => {
              setErrors({start_at: errors.start_at, place_id: errors.place_id, end_at: null})
            }} style={{marginBottom: 10}}>
              End date {errors.end_at}
            </Alert> : null
          }
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
