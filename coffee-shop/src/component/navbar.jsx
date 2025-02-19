import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import logo from "../asset/logo.png";
import user from "../asset/account_circle.svg";
import menu from "../asset/menu.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authAction } from "../store/authReducer";
import { itemAction } from "../store/itemReducer";
import { reportAction } from "../store/reportReducer";
import { ROUTE } from "../constant/route";
import Drawer from "../component/drawer";

const pages = ["Item", "Recipe"];

const Navbar = () => {
  const { email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openUser, setOpenUser] = React.useState(null);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const logoStyle = {
    width: windowWidth > 555 ? "50px" : windowWidth > 425 ? "40px" : "30px",
    height: "auto",
    alignSelf: "center",
  };

  const handleOpenUserMenu = (event) => {
    setOpenUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setOpenUser(null);
  };

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleLogout = () => {
    // dispatch(authAction.logout());
    dispatch(itemAction.clear());
    dispatch(reportAction.clear());
    // navigate(ROUTE.LOGIN);
  };

  const handleMenu = (id) => {
    switch (id) {
      case 0:
        navigate(ROUTE.ITEM);
        break;
      case 1:
        navigate(ROUTE.RECIPE);
        break;
      default:
        break;
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        height: "10vh",
        backgroundColor: "#685252",
      }}
    >
      <Box
        sx={{
          p: 0,
          display: "flex",
          height: "inherit",
        }}
      >
        <Toolbar disableGutters sx={{
            display:"flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width:"-webkit-fill-available",
        }}>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "12px",
            }}
          >
            <Box
              sx={{
                my: 2,
                display: "none",
                "&:hover": {
                  backgroundColor: "#685252",
                },
                "@media (max-width:555px)": {
                  display: "flex",
                },
              }}
            >
              <img
                alt="menu"
                src={menu}
                // style={logoStyle}
                onClick={handleDrawer}
              />
            </Box>
            <img alt="logo" src={logo} style={logoStyle} />
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
                  onClick={() => handleMenu(id)}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    "&:hover": {
                      backgroundColor: "#685252",
                    },
                    "@media (max-width:555px)": {
                      display: "none",
                    },
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Container>
          <Container
            sx={{
              justifyItems: "end",
              "@media (max-width:320px)": {
                pl: 0,
              },
            }}
          >
            <Box
              sx={{
                flexGrow: 0,
                width: "max-content",
                display: "flex",
                flexDirection: "row",
                "@media (max-width:555px)": {
                  display: "none",
                },
              }}
            >
              <Typography
                noWrap
                sx={{
                  ml: 1,
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  alignContent: "center",
                }}
              >
                {email}
              </Typography>
              <Tooltip title={email}>
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
      </Box>
      <Drawer
        isOpen={openDrawer}
        handleClose={handleDrawer}
        pages={pages}
        onClick={handleMenu}
        logout={handleLogout}
      />
    </AppBar>
  );
};
export default Navbar;
