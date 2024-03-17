import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  CardActionArea,
  CardMedia,
  CircularProgress,
  Grid,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import Divider from "@mui/material/Divider";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate} from "react-router-dom";
import { AccountCircle, ArrowBackIos } from "@mui/icons-material";
import { useEffect } from "react";
import { useState } from "react";
import { Service } from "../api/service";

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

function HomeAfterLogin() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [users, setUsers] = useState([]);
  // const [user, setUser] = useState([]);
  const [courses, setCourses] = useState([]);
  // const [searchParams] = useSearchParams();
  // const id = searchParams.get("id");
  const userLocal = JSON.parse(localStorage.getItem("objUser"));

  const services = new Service();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    autoLoad(userLocal.id);
  }, [userLocal.id]);

  const autoLoad = async (id) => {
    console.log(id);

    setLoading(true);
    try {

      // const res2 = await services.getUserById(id);
      // const res = await services.getAllUser();
      const resCourse = await services.getAllCourse();
      // setUser(res2);
      // setUsers(res);
      setCourses(resCourse);

      
      console.log(userLocal);
    } catch (error) {
      console.error("Failed to load User:", error);
    } finally {
      setLoading(false);
    }
  };

  function goToHomePage() {
    navigate("/");
  }

  function goToUserProfile(id) {
    navigate(`/userProfile?id=${id}`);
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
                    {userLocal.name_en}
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
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        goToUserProfile(userLocal.id);
                      }}
                      disableRipple
                    >
                      <AccountCircle />
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                      <FileCopyIcon />
                      Duplicate
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem onClick={()=>{handleClose();navigate(-1)}} disableRipple>
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
            <Typography variant="h4">หลักสูตรทั้งหมด</Typography>
            <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                {courses?.map((e) => (
                  // eslint-disable-next-line react/jsx-key
                  <Grid
                    xs={3}
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                      alignContent: "center",
                      marginTop: "5%",
                    }}
                  >
                    <CardActionArea
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        width: "70%",
                        height: "250px",
                        boxShadow: "3px 3px 3px 3px",
                        padding:'20px'
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={e.course_picture}
                        alt={e.name}
                      />
                      <Typography variant="h5">{e.name}</Typography>
                    </CardActionArea>
                  </Grid>
                ))}
              </Grid>
          </div>
        </div>
      )}
    </>
  );
}

export default HomeAfterLogin;
