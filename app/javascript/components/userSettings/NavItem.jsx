import React from 'react';
import {Link, ListItem} from "@mui/material";

const NavItem = ({link, handleClick}) => {
  return (
    <ListItem divider
              key={link.name}
              sx={{
                paddingTop: "10px",
                paddingBottom: "10px",
                "&:hover": {
                  background: "blue",
                  color: "white"
                }
              }}
              onClick={handleClick}
    >
      <Link
        style={{fontWeight: "545"}}
        color="inherit"
        variant="button"
        underline="none"
        href={link.href}>
        {link.name}
      </Link>
    </ListItem>
  );
};

export default NavItem;