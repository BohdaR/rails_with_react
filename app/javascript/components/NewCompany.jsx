import React, {useEffect, useState} from 'react';
import {post} from "./useAPI/useAPI";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import "../stylesheets/company.css"

const NewCompany = ({token, company}) => {
	const [name, setName] = useState("");
	const [domainName, setDomainName] = useState("");
	const [description, setDescription] = useState("");
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("");

  const handleModal = () => {
    setOpen(!open);
  }


	let handleSubmit = async (e) => {
    e.preventDefault();
		post(`${process.env.HOST}/companies`, {
			authenticity_token: token,
			company: {
				name: name,
				domain_name: domainName,
				description: description
			}
			}).then(
			(response) => {
				if (response.status === 200) {
					setName("");
					setDomainName("");
					setDescription("");
					setMessage("Company was created successfully");
				} else {
					setMessage("Some error occured");
				}
			}
			).catch(
			(errors) => {
				console.log(errors);
			});
  };

	return(
		<div>
			<Button variant="outlined" onClick={handleModal}>
        Create New Company
      </Button>
      <Dialog open={open} onClose={handleModal}>
        <h2 className="new_company_title">New Company</h2>
        <DialogContent>
					<div className="company_form">
						<form onSubmit={handleSubmit}>
							<div className="message">{message ? <p>{message}</p> : null}</div>
							<input type="text"
								className="company_input"
								value={name}
								placeholder="Name"
								onChange={(e) => setName(e.target.value)}
								required
							/>
							<input type="text"
								className="company_input"
								name="domain"
								value={domainName}
								placeholder="Domain Name"
								onChange={(e) => setDomainName(e.target.value)}
								required
							/>
							<textarea cols="30" rows="10"
								value={description}
								placeholder="Description"
								onChange={(e) => setDescription(e.target.value)}
							/>
							<div className="new_company_btns">
								<Button type="submit">Create</Button>
								<Button onClick={handleModal}>Cancel</Button>
							</div>
						</form>
					</div>
        </DialogContent>
      </Dialog>
		</div>
		);
};

export default NewCompany;
