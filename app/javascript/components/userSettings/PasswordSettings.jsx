import React, {Fragment, useState} from 'react';
import PasswordInput from "./PasswordInput";
import {Box} from "@mui/material";
import Button from "@mui/material/Button";

const PasswordSettings = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  return (
    <Fragment>
      <h2>Password settings</h2>
      <PasswordInput value={oldPassword} label={"Old password"} setValue={setOldPassword}/>
      <PasswordInput value={newPassword} label={"New Password"} setValue={setNewPassword}/>
      <PasswordInput value={passwordConfirmation} label={"Password Confirmation"}
                     setValue={setPasswordConfirmation}/>
      <Box sx={{marginTop: "30px"}}>
        <Button variant="contained">Save</Button>
        <Button variant="text">Cancel</Button>
      </Box>
    </Fragment>
  );
};

export default PasswordSettings;
