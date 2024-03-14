import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Button, Card, CircularProgress } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import * as React from "react";
// import { styled, alpha } from '@mui/material/styles';
// import Button from '@mui/material/Button';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import Divider from "@mui/material/Divider";
import FileCopyIcon from "@mui/icons-material/FileCopy";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate, useSearchParams } from "react-router-dom";
import { AccountCircle, ArrowBackIos } from "@mui/icons-material";
import { useEffect } from "react";
import { useState } from "react";
import { Service } from "../../api/service";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function UserProfile() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  // const [searchParams] = useSearchParams();
  // const id = searchParams.get("id");

  const services = new Service();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    autoLoad(id);
  }, [id]);

  const autoLoad = async (id) => {
    console.log();

    setLoading(true);
    try {
      const res = await services.getUserById(id);

      setUser(res);
      console.log(res);
    } catch (error) {
      console.error("Failed to load Users:", error);
    } finally {
      setLoading(false);
    }
  };

  function goToHomePage() {
    navigate("/");
  }

  return (
    <>
      {loading ? (
        <>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CircularProgress />
          </div>
        </>
      ) : (
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" style={{ backgroundColor: "skyblue" }}>
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={() => {
                    goToHomePage();
                  }}
                >
                  <HomeIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", sm: "block", marginLeft: "5%" },
                  }}
                >
                  หลักสูตร
                </Typography>

                <Search style={{ marginRight: "5%" }}>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
                <div>
                  <Button
                    id="demo-customized-button"
                    aria-controls={open ? "demo-customized-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                    style={{ borderRadius: "30px" }}
                  >
                    <PersonIcon style={{ marginRight: "5px" }} />
                    Sitthikan Chaiyamart
                  </Button>
                  <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                      "aria-labelledby": "demo-customized-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose} disableRipple>
                      <AccountCircle />
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        navigate(`/certificateGen`);
                      }}
                      disableRipple
                    >
                      <FileCopyIcon />
                      Certificate
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        navigate(-1);
                      }}
                      disableRipple
                    >
                      <ArrowBackIos />
                      Back
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        goToHomePage();
                      }}
                      disableRipple
                    >
                      <LogoutIcon />
                      Log Out
                    </MenuItem>
                  </StyledMenu>
                </div>
              </Toolbar>
            </AppBar>
          </Box>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              marginTop: "15vh",
              marginBottom: "5%",
              paddingBottom: "5%",
              // backgroundColor: "gray",
            }}
          >
            <Card style={{ width: "70%", height: "70vh" }}>
              <Avatar style={{ width: "200px", height: "200px" }} />
              <Typography variant="h4">{/* {user.email} */}</Typography>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfile;
