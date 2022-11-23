import React, { useState } from "react";
import {post} from "./useAPI/useAPI";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const FavoriteButton = ({ token, reservation }) => {
	const [favorited, setFavorited] = useState(false);

	const onFavoriteClick = () => {
		post(`${process.env.HOST}/favorites`, {
			authenticity_token: token,
			favorite: {
				place_id: reservation.place_id
			}
			}).then(
			(response) => {
				setFavorited(favorited);
				console.log(favorited);
			}
			).catch(
			(errors) => {
				console.log(errors);
			});
	}
  return(
		<>
			<button onClick={onFavoriteClick}> Add to Favorite </button>
			{/* <h2 onClick={() => setFavorited((prevState) => !prevState)}>
				{ favorited ? <StarIcon/> : <StarBorderIcon/> }
			</h2> */}
		</>
	);
}

export default FavoriteButton;