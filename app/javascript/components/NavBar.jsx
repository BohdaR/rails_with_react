import React from 'react';
import style from '../stylesheets/header.module.css'
import NavItemsGroup from "./NavItemsGroup";

const NavBar = ({leftItems, rightItems}) => {
  return (
    <div className={style.topNav}>
      <div className={style.headerNav}>
        <NavItemsGroup  className= {style.topNavLeft} items={leftItems}/>
        <NavItemsGroup className={style.topNavRight} items={rightItems}/>
      </div>
    </div>
  );
};

export default NavBar;
