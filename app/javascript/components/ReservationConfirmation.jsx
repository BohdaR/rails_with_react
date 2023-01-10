import React, {useState} from 'react';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {Alert} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

const ReservationConfirmation = ({
                                   open,
                                   setOpen,
                                   errors,
                                   setErrors,
                                   handleSuccess,
                                   confirmationMessage
                                 }) => {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title"
                   style={{
                     textAlign: "center",
                     color: "#173166"
                   }}>
        {"Book a place"}
      </DialogTitle>
      <DialogContent>
        {errors.start_at ?
          <Alert severity="error" onClose={() => {
            setErrors({...errors, start_at: null})
          }} style={{marginBottom: 10}}>
            Start date {errors.start_at} <br/>
          </Alert> : null
        }
        {errors.place_id ?
          <Alert severity="error" onClose={() => {
            setErrors({...errors, place_id: null})
          }} style={{marginBottom: 10}}>
            Place {errors.place_id}
          </Alert> : null
        }
        {errors.end_at ?
          <Alert severity="error" onClose={() => {
            setErrors({...errors, end_at: null})
          }} style={{marginBottom: 10}}>
            End date {errors.end_at}
          </Alert> : null
        }
        {errors.time ?
          <Alert severity="error" onClose={() => {
            setErrors({...errors, time: null})
          }} style={{marginBottom: 10}}>
            {errors.time}
          </Alert> : null
        }
        {errors.place ?
          <Alert severity="error" onClose={() => {
            setErrors({...errors, place: null})
          }} style={{marginBottom: 10}}>
            {errors.place}
          </Alert> : null
        }
        <DialogContentText id="alert-dialog-description">
          {confirmationMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          style={{
            color: "#173166"
          }}
        >Cancel</Button>
        <Button
          onClick={handleSuccess}
          autoFocus
          style={{
            color: "#173166"
          }}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReservationConfirmation;
