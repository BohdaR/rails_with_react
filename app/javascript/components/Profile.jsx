import React, {Fragment, useState} from 'react';
import style from '../stylesheets/profile.module.css'
import {
  Alert,
  Avatar,
  Divider,
  List,
} from "@mui/material";
import {deepOrange} from "@mui/material/colors";
import NotificationSettings from "./userSettings/NotificationSettings";
import NavItem from "./userSettings/NavItem";
import PasswordSettings from "./userSettings/PasswordSettings";
import AccountInfoSettings from "./userSettings/AccountInfoSettings";

const Profile = ({user, form_authenticity_token, has_slack_id, company_slack, settings}) => {
  const [errors, setErrors] = useState({});
  const [openSetting, setOpenSetting] = useState({
    account: true,
    password: false,
    notification: false,
    security: false,
  })

  const navLinks = [
    {name: 'Account', href: '#acount'},
    {name: 'Password', href: '#'},
    {name: 'Notification', href: '#'},
    {name: 'Security', href: '#'}
  ]

  return (
    <Fragment>
      <h1 className={style.pageHeadline}>Account settings</h1>
      <Divider flexItem/>
      <div className={style.profileWrapper}>
        <Divider orientation="vertical" flexItem/>
        <div className={style.profileNavTab}>
          <Avatar
            sx={{
              bgcolor: deepOrange[500],
              width: 50,
              height: 50,
              marginTop: "20px",
              marginBottom: "20px",

            }}
            alt="Remy Sharp"
            src={user.avatar_url}
          />
          <h2 className={style.userName}>{user.full_name}</h2>
          <Divider flexItem/>
          <List sx={{
            width: "100%",
            paddingTop: 0,
            paddingBottom: 0
          }}>
            <NavItem link={{name: 'account', href: '#account'}}
                     handleClick={() => setOpenSetting({account: true})}/>
            <NavItem link={{name: 'password', href: '#password'}}
                     handleClick={() => setOpenSetting({password: true})}/>
            <NavItem link={{name: 'notification', href: '#notification'}}
                     handleClick={() => setOpenSetting({notification: true})}/>
          </List>
        </div>
        <Divider orientation="vertical" flexItem/>
        <div className={style.profileContentTab}>
          {errors.current_password ?
            <Alert severity="error" onClose={() => {
              setErrors({...errors, current_password: null})
            }} style={{marginBottom: 10}}>
              Current password {errors.current_password} <br/>
            </Alert> : null
          }
          {errors.full_name ?
            <Alert severity="error" onClose={() => {
              setErrors({...errors, full_name: null})
            }} style={{marginBottom: 10}}>
              Full name {errors.full_name}
            </Alert> : null
          }
          {errors.email ?
            <Alert severity="error" onClose={() => {
              setErrors({...errors, email: null})
            }} style={{marginBottom: 10}}>
              Email {errors.email}
            </Alert> : null
          }
          {errors.new_password ?
            <Alert severity="error" onClose={() => {
              setErrors({...errors, new_password: null})
            }} style={{marginBottom: 10}}>
              New password {errors.new_password}
            </Alert> : null
          }
          {openSetting.account ?
            <AccountInfoSettings token={form_authenticity_token} user={user} setErrors={setErrors}/> : null}
          {openSetting.password ? <PasswordSettings token={form_authenticity_token} setErrors={setErrors}/> : null}
          {openSetting.notification ?
            <NotificationSettings setErrors={setErrors} user={user} has_slack_id={has_slack_id}
                                  company_slack={company_slack} token={form_authenticity_token} settings={settings}/> : null}
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
