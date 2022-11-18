import React, { useState } from "react";
import {post} from "./useAPI/useAPI";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const FavoriteButton = ({ token, place }) => {
	const [favorited, setFavorited] = useState(false);

	const onFavoriteClick = () => {
		if (favorited) {
			post(`${process.env.HOST}/favorites`, {
				authenticity_token: token,
				favorite: {
				  place_id: place.id
				}
			  }).then(
				(response) => {
					setFavorited(!favorited);
					console.log(response.data);
				}
			  ).catch(
				(errors) => {
				  console.log(errors);
				});
			} else {
				post(`${process.env.HOST}/favorites`, {
					authenticity_token: token,
					favorite: {
						place_id: place.id
					}
					}).then(
					(response) => {
					setFavorited(favorited);
					console.log(response.data);
					}
					).catch(
					(errors) => {
						console.log(errors);
					});
		}
		
	}
  return(
		<>
			<button onClick={onFavoriteClick}>{favorited ? " Not Favorite~" : "Add to Favorite "} </button>
			{/* <h2 onClick={() => setFavorited((prevState) => !prevState)}>
				{ favorited ? <StarIcon/> : <StarBorderIcon/> }
			</h2> */}
		</>
	);
}

export default FavoriteButton;