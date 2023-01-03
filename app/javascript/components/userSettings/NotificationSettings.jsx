import React, {Fragment, useState} from 'react';
import {Box, FormControlLabel, Switch} from "@mui/material";
import Button from "@mui/material/Button";
import SlackLoginButton from "../SlackLoginButton";
import {put} from "../useAPI/useAPI";

const NotificationSettings = ({has_slack_id, company_slack, token, setErrors, settings}) => {
  const [slackNotifications, setSlackNotifications] = useState(settings.slack_notifications);
  const [emailNotifications, setEmailNotifications] = useState(settings.email_notifications);

  const changeSlackNotification = (checked) => {
    const data = {
      authenticity_token: token,
      employee_setting: {
        slack_notifications: checked
      }
    }
    put(`${process.env.API_HOST}/employee_settings/${settings.id}`, data)
      .then(
        (response) => {
          setSlackNotifications(checked)
        }
      )
  }

  const changeEmailNotification = (checked) => {
    const data = {
      authenticity_token: token,
      employee_setting: {
        email_notifications: checked
      }
    }
    put(`${process.env.API_HOST}/employee_settings/${settings.id}`, data)
      .then(
        (response) => {
          setEmailNotifications(checked)
        }
      )
  }

  return (
    <Fragment>
      <h2>Notification settings</h2>
      {!company_slack ?
        <h3 style={{marginTop: "20px", color: "red"}}>Your company has not integrated with slack
          yet!</h3> : null
      }
      {!has_slack_id && company_slack ?
        <div>
          <h3 style={{marginTop: "20px", marginBottom: "10px"}}>To receive slack notifications, you need to link your
            slack account!</h3>
          <SlackLoginButton text="Link slack account"/>
        </div> : null
      }
      {has_slack_id && company_slack ?
        <FormControlLabel sx={{marginTop: "20px"}} control={
          <Switch
            checked={slackNotifications}
            onChange={(e) => changeSlackNotification(e.target.checked)}/>
        } label="Slack notification"/> : null
      }
      <FormControlLabel control={
        <Switch
          checked={emailNotifications}
          onChange={(e) => changeEmailNotification(e.target.checked)}/>
      } label="Email notification"/>
    </Fragment>
  );
};

export default NotificationSettings;
