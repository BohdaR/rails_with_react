import React, {Fragment, useState} from 'react';
import PasswordInput from "./PasswordInput";
import {Box, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {put} from "../useAPI/useAPI";

const AccountInfoSettings = ({token, user, setErrors}) => {
  const [userName, setUserName] = useState(user.full_name);
  const [userEmail, setUserEmail] = useState(user.email);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [password, setPassword] = useState('');

  const config = {
    headers: {
      accept: 'application/json'
    }
  }

  const handeForm = () => {
    const data = {
      authenticity_token: token,
      user: {
        current_password: password,
        email: userEmail,
        full_name: userName,
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
      <h2>Account information</h2>
      <TextField
        sx={{
          marginTop: "10px",
        }}
        variant="standard"
        label="Name"
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <TextField
        sx={{
          marginTop: "10px",
        }}
        variant="standard"
        label="Email"
        type="email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <PasswordInput value={password} label={"Current password"} setValue={setPassword}/>
      <Box sx={{marginTop: "30px"}}>
        <Button variant="contained" onClick={handeForm}>Save</Button>
        <Button variant="text">Cancel</Button>
      </Box>
    </Fragment>
  );
};

export default AccountInfoSettings;
