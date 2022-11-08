import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export function Favorite(props) {
  return(
		<div className="favorite-list">
      <li>Place Number: { props.favorite.place.number }</li>
			<IconButton onClick={() => props.favoriteDeleted}>
 				<DeleteIcon style={{
        color: "#FAFBFC"
      }} />
    </IconButton>
    </div>
  );
}