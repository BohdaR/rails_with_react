import React from 'react';

import NavItemsGroup from "./NavItemsGroup";

const NavBar = ({leftItems, rightItems}) => {
  return (
    <div className="top-nav">
      <NavItemsGroup className={"top-nav-left"} items={leftItems}/>
      <NavItemsGroup className={"top-nav-right"} items={rightItems}/>
    </div>
  );
};

export default NavBar;
