import React from 'react';
import {Avatar, Box} from "@mui/material";
import {deepOrange} from "@mui/material/colors";

const BookedPlaceMarker = ({place, width, height, radius}) => {
  return (
    <Box
      key={place.id}
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
        sx={{
          height: width * radius,
          width: width * radius,
          fontSize: width * radius * 0.6,
          bgcolor: deepOrange[500],
        }}
      >{place.user_email ? place.user_email.charAt(0) : null}</Avatar>
    </Box>
  )
};

export default BookedPlaceMarker;
