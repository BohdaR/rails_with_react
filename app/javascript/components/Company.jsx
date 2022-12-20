import React, {useState} from 'react';
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
import style from '../stylesheets/reservations.module.css';
// import {deleteRequest} from "./useAPI/useAPI";

const Company = ({company, token}) => {
	const [showCompany, setShowCompany] = useState(true);

	const createCompany = () => {
		post(`${process.env.HOST}/reservations`, {
      authenticity_token: token,
      company: {
        name: companyName,
        domain_name: domainName,
				description: description
      }
    }).then((response) => {
      setShowPlace(false);
    })
	}

	return (
		<div>
			
		</div>
	)

};

export default Company;
