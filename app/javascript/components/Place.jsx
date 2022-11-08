import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {post} from "./useAPI/useAPI";
import style from '../stylesheets/booking.module.css'

const Place = ({place, token, start_at, end_at, setShowRoom}) => {
  const [showPlace, setShowPlace] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const confirmationMessage = `
  Are you sure you want to book 
  a seat number ${place.number} 
  from ${start_at.replace('T', ' ')} to ${end_at.replace('T', ' ')}?
  `;

  const handleModal = () => setOpen(!open);

  const bookPlace = () => {
    if (start_at > end_at) {
      setError('end date must be greater than start date')
      return
    };

    post(`${process.env.HOST}/reservations`, {
      authenticity_token: token,
      reservation: {
        start_at: start_at,
        end_at: end_at,
        place_id: place.id
      }
    }).then((response) => {
      setShowPlace(false)
      if (document.getElementsByTagName('button').length === 1) setShowRoom(false)
    });
  }

  return (
    <div className={style.place}>
      {
        showPlace ?
          <div>
            <button className={style.bookingButton} onClick={handleModal}>
              Place {place.number}
            </button>
            <Dialog
              open={open}
              onClose={handleModal}
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
                <DialogContentText id="alert-dialog-description">
                  {confirmationMessage}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button 
                  onClick={handleModal}
                  style={{
                    color: "#173166"
                  }}
                >Cancel</Button>
                <Button 
                  onClick={bookPlace} autoFocus
                  style={{
                    color: "#173166"
                  }}>
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
            <h2>{error}</h2>
          </div> : null
      }
    </div>
  )
};

export default Place;