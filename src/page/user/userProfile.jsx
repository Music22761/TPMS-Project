import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import QRCode from "qrcode.react";

// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import * as React from "react";
// import { styled, alpha } from '@mui/material/styles';
// import Button from '@mui/material/Button';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import Divider from "@mui/material/Divider";
import FileCopyIcon from "@mui/icons-material/FileCopy";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate, useSearchParams } from "react-router-dom";
import { AccountCircle, ArrowBackIos, LockReset, ModeEdit } from "@mui/icons-material";
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
  const id = Number(searchParams.get("id"));
  

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [openDia, setOpenDia] = useState(false);
  // const [date,setDate] = useState();

  const [qrCode, setQrCode] = useState(
    "https://www.facebook.com/profile.php?id=100005741918319"
  );

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
    console.log('ID: '+id);

    setLoading(true);
    try {
      const res = await services.getUserById(id);
      setUser(res);
      // const date = new Date(user?.[0].create_at);
      // const day = date.getDate();
      // const month = date.getMonth();
      // const year = date.getFullYear();

      // console.log("Month: "+month);

      // setDate(`${day}/${month}/${year}`)
      
      console.log("Res Data: "+ res);
    } catch (error) {
      console.error("Failed to load Users:", error);
    } finally {
      setLoading(false);
    }
  };

  function goToHomePage() {
    navigate("/");
  }

  function date(time) {

    const date = new Date(time);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${day}/${month}/${year}`
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
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection:'column',
            alignItems:'center',


          }}
        >
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
                    {user?.[0].name_en}
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
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        setOpenDia(true);
                        dialog();
                        // openDia(true);
                      }}
                      disableRipple
                    >
                      <QrCode2Icon />
                      QR Code
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem
                      onClick={() => {
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

          <React.Fragment>
            <Button
              variant="outlined"
              onClick={() => {
                setOpenDia(true);
              }}
            >
              Open alert dialog
            </Button>
            <Dialog
              open={openDia}
              onClose={() => setOpenDia(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Your QR CODE"}
              </DialogTitle>
              <DialogContent>
                <div style={{ alignItems: "center" }}>
                  <QRCode value={qrCode} size={256} level="H" />
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDia(false)}>Disagree</Button>
                <Button onClick={() => setOpenDia(false)} autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>

          {/* <div
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
          > */}
          <Card
            style={{
              display:'flex',
              width: "70%",
              height: "70vh",
              marginTop: "15vh",
              // justifyContent: "center",
              alignItems: "center",
              paddingTop:'2%',
              boxShadow: "3px 3px 3px 3px",
              flexDirection:'column',
            }}
          >
            <Avatar src={user?.[0].profile_picture} style={{ width: "200px", height: "200px" }} />
            <Typography variant="h4">{user?.[0].name_th}</Typography>
            <Typography variant="h4">{user?.[0].name_en}</Typography>
            <Typography variant="h4">{user?.[0].role}</Typography>
            <Typography variant="h4">{user?.[0].email}</Typography>
            <Typography variant="h4">{date(user?.[0].create_at)}</Typography>
            <div style={{display:'flex',flexDirection:'row'}}>
              <Button variant="contained" style={{marginRight:'20px'}}><ModeEdit style={{marginRight:'10px'}}/> แก้ไขข้อมูล</Button>
              <Button variant="contained" ><LockReset style={{marginRight:'10px'}}/> เปลี่ยนรหัสผ่าน</Button>
            </div>
          </Card>
          {/* </div> */}
        </div>
      )}
    </>
  );

  function dialog() {
    return (
      <React.Fragment>
        <Button
          variant="outlined"
          onClick={() => {
            setOpenDia(true);
          }}
        >
          Open alert dialog
        </Button>
        <Dialog
          open={open}
          onClose={() => setOpenDia(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Your QR CODE"}</DialogTitle>
          <DialogContent>
            <div style={{ alignItems: "center" }}>
              <QRCode value={qrCode} size={256} level="H" />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDia(false)}>Disagree</Button>
            <Button onClick={() => setOpenDia(false)} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default UserProfile;
