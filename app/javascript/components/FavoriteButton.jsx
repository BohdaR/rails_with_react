import React, { useState } from "react";
import {post} from "./useAPI/useAPI";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const FavoriteButton = ({ token, place }) => {
	const [favorited, setFavorited] = useState(false);

	const addFav = () => { post(`${process.env.HOST}/favorites`, {
		authenticity_token: token,
		favorite: {
		  place_id: 7
		}
	  }).then(
		(response) => {
		setFavorited(response.data);
		console.log(response.data);
		}
	  ).catch(
		(errors) => {
		  console.log(errors);
		});
	}
  return(
		<>
			{/* <button onClick={addFav}>Favorite</button> */}
			<h2 onClick={() => setFavorited((prevState) => !prevState)}>
				{ favorited ? <StarIcon/> : <StarBorderIcon/> }
			</h2>
		</>
	);
}

export default FavoriteButton;