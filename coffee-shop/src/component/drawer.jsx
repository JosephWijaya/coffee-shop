import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { IconButton, Typography } from "@mui/material";
import user from "../asset/account_circle.svg";
import { useSelector } from "react-redux";

const DrawerMenu = (props) => {
  const { email } = useSelector((state) => state.auth);
  const onClose = () => {
    props.handleClose(false);
  };

  const handleClick = (idx) => {
    props.onClick(idx);
  };

  const handleLogout = () => {
    props.logout();
  };

  return (
    <Drawer
      open={props.isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: "60%", // Set the width of the drawer to 60%
        },
      }}
    >
      <Box role="presentation" onClick={onClose}>
        <Box
          sx={{
            height: "10vh",
            backgroundColor: "#685252",
            display: "flex",
          }}
        >
          <IconButton sx={{ p: 0, ml: 1 }}>
            <img
              alt="Remy Sharp"
              src={user}
              style={{ width: "50px", height: "auto" }}
            />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              ml: 1,
              color: "#f9ffff",
              alignSelf: "center",
            }}
          >
            {email}
          </Typography>
        </Box>
        <Divider />
        <List>
          {props.pages.map((text, index) => (
            <ListItem
              key={index}
              sx={{
                height: "56px",
                cursor: "pointer",
              }}
            >
              <Button
                variant="primary"
                onClick={() => handleClick(index)}
                sx={{
                  width: "inherit",
                  p: "12px 20px",
                  fontSize: "16px",
                  color: "#000",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  justifyContent: "start",
                  "&:hover": {
                    backgroundColor: "#685252",
                    color: "#fff",
                  },
                  "@media (max-width:426px)": {},
                }}
              >
                {text}
              </Button>
            </ListItem>
          ))}
        </List>
        <Box
          sx={{
            display: "flex",
            position: "fixed",
            bottom: 0,
            width: "54%",
            p : "8px 16px"
          }}
        >
          <Button
            variant="primary"
            onClick={handleLogout}
            sx={{
              width: "100%",
              p: "12px 20px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#685252",
              color: "#fff",
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default DrawerMenu;
