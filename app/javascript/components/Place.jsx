import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {post} from "./useAPI/useAPI";
import style from '../stylesheets/booking.module.css'
import {Alert} from "@mui/material";

const Place = ({place, token, start_at, end_at, setShowRoom}) => {
  const [showPlace, setShowPlace] = useState(true);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});


  const confirmationMessage = `
  Are you sure you want to book 
  a seat number ${place.number} 
  from ${start_at.replace('T', ' ')} to ${end_at.replace('T', ' ')}?
  `;

  const handleModal = () => {
    setOpen(!open);
    setErrors({});
  }

  const bookPlace = () => {

    post(`${process.env.HOST}/reservations`, {
      authenticity_token: token,
      reservation: {
        start_at: start_at,
        end_at: end_at,
        place_id: place.id
      }
    }).then((response) => {
      setShowPlace(false)
      if (document.getElementsByClassName(style.bookingButton).length === 1) setShowRoom(false)
    }).catch(
      (errors) => {
        setErrors(errors.response.data)
      }
    );
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
                      setErrors({email: errors.start_at, place_id: errors.place_id, end_at: null})
                    }} style={{marginBottom: 10}}>
                      End date {errors.end_at}
                    </Alert> : null
                  }
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
          </div> : null
      }
    </div>
  )
};

export default Place;
