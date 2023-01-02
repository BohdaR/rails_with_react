import React, {Fragment, useState} from 'react';
import PasswordInput from "./PasswordInput";
import {Box} from "@mui/material";
import Button from "@mui/material/Button";
import {put} from "../useAPI/useAPI";

const PasswordSettings = ({token, setErrors}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const config = {
    headers: {
      accept: 'application/json'
    }
  }

  const handeForm = () => {
    if (newPassword === ''){
      setErrors({new_password: "New password can't be blank!"})
      return;
    }
    const data = {
      authenticity_token: token,
      user: {
        password_confirmation: passwordConfirmation,
        current_password: oldPassword,
        password: newPassword,
      }
    }

    put(`${process.env.API_HOST}/user`, data, config)
      .then(
        () => {
          setErrors({})
        }
      )
      .catch(
        (errors) => {
          setErrors(errors.response.data.errors)
        }
      )
  }

  return (
    <Fragment>
      <h2>Password settings</h2>
      <PasswordInput value={oldPassword} label={"Old password"} setValue={setOldPassword}/>
      <PasswordInput value={newPassword} label={"New password"} setValue={setNewPassword}/>
      <PasswordInput value={passwordConfirmation} label={"Password confirmation"}
                     setValue={setPasswordConfirmation}/>
      <Box sx={{marginTop: "30px"}}>
        <Button variant="contained" onClick={handeForm}>Save</Button>
        <Button variant="text">Cancel</Button>
      </Box>
    </Fragment>
  );
};

export default PasswordSettings;
