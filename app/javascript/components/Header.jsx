import React, {Fragment, useState} from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Box from "@mui/material/Box";
import {Link, Container, SwipeableDrawer, Divider, List, ListItem} from "@mui/material";


const Header = ({leftNavigationLinks, rightNavigationLinks}) => {
  const [open, setOpen] = useState(false)

  const navLinksStyle = {
    padding: "24px 0",
    position: "relative",
    "&::after": {
      content: '""',
      position: " absolute",
      bottom: "19px",
      left: "0",
      right: "0",
      height: "2px",
      background: "#ffffff",
      transition: "0.7s transform",
      opacity: 0,
    },
    "&:hover::after": {
      opacity: 1,
    }
  }


  return (
    <Fragment>
      <AppBar position="static" sx={{
        background: "#173166",
        marginBottom: "20px"
      }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={
              {
                display: {md: 'none', xs: 'block'},
                flexGrow: 1
              }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{mr: 2}}
                onClick={() => setOpen(true)}
              >
                <MenuIcon/>
              </IconButton>
            </Box>
            <Box sx={
              {
                display: {
                  md: 'block',
                  xs: 'none'
                },
                flexGrow: 1
              }}>
              {leftNavigationLinks.map((item) =>
                <Link
                  key={item.name}
                  sx={{
                    marginRight: "20px",
                    ...navLinksStyle
                  }}
                  color="inherit"
                  variant="button"
                  underline="none"
                  href={item.href}>
                  {item.name}
                </Link>
              )}
            </Box>
            <Box>
              {rightNavigationLinks.map((item) =>
                <Link
                  key={item.name}
                  color="inherit"
                  variant="button"
                  underline="none"
                  sx={{
                    marginLeft: "20px",
                    ...navLinksStyle
                  }}
                  href={item.href}>
                  {item.name}
                </Link>
              )}
            </Box>
          </Toolbar>
        </Container>
        <SwipeableDrawer
          sx={{
            "& .MuiPaper-root": {
              background: "#173166",
              color: "inherit"
            },
            "& .MuiButtonBase-root": {
              color: "inherit"
            }
          }}
          anchor="left"
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          <div>
            <IconButton onClick={() => setOpen(false)}>
              <ChevronLeftIcon/>
            </IconButton>
          </div>
          <Divider/>
          <List>
            {leftNavigationLinks.map((item) =>
              <ListItem
              sx={{
                "&:hover": {
                  background: "white",
                  color: "black"
                }
              }}
              >
                <Link
                  key={item.name}
                  sx={{}}
                  color="inherit"
                  variant="button"
                  underline="none"
                  href={item.href}>
                  {item.name}
                </Link>
              </ListItem>
            )}
          </List>
          <Divider/>
          <List>
            {rightNavigationLinks.map((item) =>
              <ListItem
                sx={{
                  "&:hover": {
                    background: "white",
                    color: "black"
                  }
                }}
              >
                <Link
                  key={item.name}
                  color="inherit"
                  variant="button"
                  underline="none"
                  href={item.href}>
                  {item.name}
                </Link>
              </ListItem>
            )}
          </List>
        </SwipeableDrawer>
      </AppBar>
    </Fragment>
  );
};

export default Header;
