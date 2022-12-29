import React, {useState} from 'react';
import {put} from "./useAPI/useAPI";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import "../stylesheets/company.css";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

function EditCompany({ form_authenticity_token, company }) {
	const [name, setName] = useState("");
	const [domainName, setDomainName] = useState("");
	const [description, setDescription] = useState("");
	const [open, setOpen] = useState(false);

  const handleModal = () => {
    setOpen(!open);
  }

	const handeEditForm = async (e) => {
    e.preventDefault();

    const data = {
      authenticity_token: form_authenticity_token,
      company: {
        name: name,
        domain_name: domainName,
        description: description
      }
    }

    await put(`${process.env.HOST}/companies/${company.id}`, data)
      .then(
        () => {
          setName("");
					setDomainName("");
					setDescription("");
        }
      )
      .catch(
        (errors) => {
          console.error(errors)
        }
      )
  }
  return (
    <div>
			<IconButton onClick={handleModal}>
        <EditIcon style={{
            color: "rgb(23, 49, 102)"
        }} />
			</IconButton>
			<Dialog open={open} onClose={handleModal}>
				<h2 className="new_company_title">Edit Company</h2>
				<DialogContent>
					<div className="company_form">
						<form onSubmit={handeEditForm}>
							<input type="text"
								className="company_input"
								value={name}
								placeholder={company.name}
								onChange={(e) => setName(e.target.value)}
							/>
							<input type="text"
								className="company_input"
								name="domain"
								value={domainName}
								placeholder={company.domain_name}
								onChange={(e) => setDomainName(e.target.value)}
							/>
							<textarea cols="30" rows="10"
								value={description}
								placeholder={company.description}
								onChange={(e) => setDescription(e.target.value)}
							/>
							<div className="new_company_btns">
								<Button type="submit">Update Company</Button>
								<Button onClick={handleModal}>Cancel</Button>
							</div>
						</form>
					</div>
				</DialogContent>
			</Dialog>
		</div>
  );
}

export default EditCompany;