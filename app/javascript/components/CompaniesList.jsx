import React, {useEffect, useState} from 'react';
import {get} from "./useAPI/useAPI";
import Button from '@mui/material/Button';
import style from "../stylesheets/reservations.module.css";
import "../stylesheets/favorite_places.css";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoritePlaces from "./FavoritePlaces";
// import Company from './Company';

const CompaniesList = ({token}) => {
	const [companies, setCompanies] = useState([]);

  useEffect(() => {
    get(`${process.env.HOST}/companies`)
      .then(
        (response) => {
          setCompanies(response.data)
        })
  }, []);

	const allCompanies = companies.map(company => {
		return (
			<div key={company.id} className={style.tableRow}>
				<div className={ `${style.placeColumn} ${style.col}`} 
					data-label="Company Name">
					{ company.name }
        </div>
				<div className={`${style.startColumn} ${style.col}`} 
        	data-label="Domain Name">
        	{ company.domain_name }
        </div>
				<div className={`${style.endColumn} ${style.col}`}>
					{/* <button onClick={() => history.push(`/companies/${company.id}`)}>
						Click me
					</button> */}
					<Button to={`/favoriteplaces`}>
						Click Me
					</Button>
        </div>
        <div className={`${style.btnColumn} ${style.col}`}>
          <IconButton>
            <DeleteIcon style={{
              color: "#173166"
            }}/>
          </IconButton>
        </div> 
			</div>
			);
		});

		return(
			<div>
				<h1 className={style.headline}>All companies</h1>
				<div className={style.reservationTable}>
          <div className={style.tableHeader}>
            <div className={ `${style.placeColumn} ${style.col}`}>
              Company Name
            </div>
            <div className={`${style.startColumn} ${style.col}`}>
              Domain Name
            </div>
            <div className={`${style.endColumn} ${style.col}`}></div>
            <div className={`${style.btnColumn} ${style.col}`}></div> 
          </div>
						{ allCompanies }
        </div>
			</div>
		);
};

export default CompaniesList;
