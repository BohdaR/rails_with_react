import React, {Fragment, useState} from 'react';
import style from '../stylesheets/profile.module.css'
import {
  Avatar,
  Divider,
  Link,
  List,
  ListItem,
} from "@mui/material";
import {deepOrange} from "@mui/material/colors";
import NotificationSettings from "./userSettings/NotificationSettings";
import NavItem from "./userSettings/NavItem";
import PasswordSettings from "./userSettings/PasswordSettings";

const Profile = () => {
  const [openSetting, setOpenSetting] = useState({
    account: false,
    password: false,
    notification: false,
    security: false,
  })
  const user = {
    name: 'Bohdan Shushval',
  }
  const navLinks = [
    {name: 'Account', href: '#'},
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
            src="/broken-image.jpg"
          >
            B
          </Avatar>
          <h2 className={style.userName}>{user.name}</h2>
          <Divider flexItem/>
          <List sx={{
            width: "100%",
            paddingTop: 0,
            paddingBottom: 0
          }}>
            <NavItem link={{name: 'account', href: '#'}}
                     handleClick={() => setOpenSetting({account: true})}/>
            <NavItem link={{name: 'password', href: '#'}}
                     handleClick={() => setOpenSetting({password: true})}/>
            <NavItem link={{name: 'notification', href: '#'}}
                     handleClick={() => setOpenSetting({notification: true})}/>
          </List>
        </div>
        <Divider orientation="vertical" flexItem/>
        <div className={style.profileContentTab}>
          {openSetting.notification ? <NotificationSettings/> : null}
          {openSetting.password ? <PasswordSettings/> : null}
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
