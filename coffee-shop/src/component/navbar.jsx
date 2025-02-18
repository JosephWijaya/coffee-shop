import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import logo from "../asset/logo.png";
import user from "../asset/account_circle.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authAction } from "../store/authReducer";
import { itemAction } from "../store/itemReducer";
import { ROUTE } from "../constant/route";

const pages = ["Item", "Receipe"];

const Navbar = () => {
  const { email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openUser, setOpenUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setOpenUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setOpenUser(null);
  };

  const handleLogout = () => {
    dispatch(authAction.logout());
    dispatch(itemAction.clear());
    navigate(ROUTE.LOGIN);
  };

  const handleMenu = (id) => {
    switch (id) {
        case 0:
            navigate(ROUTE.ITEM)
            break;
        default:
            break;
    }
  }

  return (
    <AppBar position="static" sx={{
        height: "10vh",
        backgroundColor: "#8d6767",
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "12px",
            }}
          >
            <img
              alt="logo"
              src={logo}
              style={{
                width: "50px",
                height: "35px",
                alignSelf: "center",
              }}
            />
            <Typography
              noWrap
              variant="h4"
              sx={{
                ml: 1,
                fontWeight: 700,
                fontSize: "1.125rem",
                alignContent: "center",
              }}
            >
              Tjendana Coffee
            </Typography>
          </Container>
          <Container sx={{ justifyItems: "center" }}>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
              {pages.map((page, id) => (
                <Button
                  key={page}
                  onClick={()=>handleMenu(id)}
                  sx={{ my: 2, color: "white", display: "block",
                    "&:hover": {
                      backgroundColor: "#685252",
                    }, }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Container>
          <Container sx={{ justifyItems: "end" }}>
            <Box sx={{ flexGrow: 0 }}>
              {email}
              <Tooltip title="User Menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1 }}>
                  <img alt="Remy Sharp" src={user} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={openUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(openUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={1} onClick={handleLogout}>
                  <Typography sx={{ textAlign: "center" }}>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Container>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
