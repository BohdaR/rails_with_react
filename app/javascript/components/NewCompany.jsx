import React, {useEffect, useState} from 'react';
import {post} from "./useAPI/useAPI";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const NewCompany = ({token, company}) => {
	const [company, setCompany] = useState({
		name: "",
		domain_name: "",
		description: ""
	});
	const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	const createCompany = (e) => {
		e.preventDefault();

		post(`${process.env.HOST}/companies`, {
      authenticity_token: token,
      company: {
        name: name,
        domain_name: domain_name,
        description: description
      }
    }).then((response) => {
      setShowPlace({})
    });
	}

	return(
		<div>
			<Button variant="outlined" onClick={handleClickOpen}>
        Create New Company
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Company</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a company, please enter company name, domain and description here.
          </DialogContentText>
          <form className="eventForm">
						<div>
							<label htmlFor="company_name">
								<strong>Name:</strong>
								<input type="text" id="name" name="name" />
							</label>
						</div>
						<div>
							<label htmlFor="description">
								<strong>Company Description:</strong>
								<textarea cols="30" rows="10" id="description" name="description" />
							</label>
						</div>
						<div>
							<label htmlFor="domain">
								<strong>Domain:</strong>
								<input type="text" id="domain" name="domian" />
							</label>
						</div>
						{/* <div className="form-actions">
							<button type="submit">Save</button>
						</div> */}
     		</form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
		</div>
		);
};

export default NewCompany;
