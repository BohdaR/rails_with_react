import React, {Fragment} from 'react';
import {Box, FormControlLabel, Switch} from "@mui/material";
import Button from "@mui/material/Button";
import SlackLoginButton from "../SlackLoginButton";

const NotificationSettings = () => {
  return (
    <Fragment>
      <h2>Notification settings</h2>
      <FormControlLabel sx={{marginTop: "20px"}} control={<Switch defaultChecked />} label="Slack notification" />
      <FormControlLabel control={<Switch defaultChecked />} label="Email notification" />
      <Box sx={{marginTop: "30px"}}>
        <Button variant="contained">Save</Button>
        <Button variant="text">Cancel</Button>
      </Box>
    </Fragment>
  );
};

export default NotificationSettings;
