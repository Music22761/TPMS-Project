import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  ListItem,
  ListItemAvatar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from "react-router-dom";
import {
  ArrowBackIos,
  CheckCircleOutline,
  RemoveCircleOutline,
} from "@mui/icons-material";
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

function AllowAdmin() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [adminOrganization, setAdminOrganization] = useState([]);
  //   const [admin, setAdmin] = useState([]);
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
      //   const resAdmin = await services.getAdminById(id);
      const res = await services.getAllAdminOrganizationNotAllow();
      //   setAdmin(resAdmin);
      setAdminOrganization(res);

      console.log(res);
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

  async function allow(id) {
    const body = {
      status: 1,
    };

    await services.putAdminOrganizationAllow(body, id);
    await autoLoad(userLocal.id);
  }

  async function deleteAdminOrganization(id, profile, signature) {
    
     services.deletePictureOnFirebase(profile);
     services.deletePictureOnFirebase(signature);
    await services.deleteAdminOrganization(id);
    await autoLoad(userLocal.id);
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
                    {userLocal.email}
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

          <div style={{ padding: "10%" }}>
            {adminOrganization?.map((e) => (
              // eslint-disable-next-line react/jsx-key
              <ListItem
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "pink",
                  borderRadius: "30px",
                  border: "2px solid grey",
                  marginBottom: "5%",
                  width: "100%",
                }}
              >
                <Grid
                  container
                  spacing={4}
                  columns={{ xs: 3, sm: 6, md: 12 }}
                  style={{
                    display: "flex",
                    padding: "5%",
                    alignContent: "center",
                  }}
                >
                  <Grid xs={3}>
                    <ListItemAvatar>
                      <IconButton
                        onClick={() => {
                          //   goToProfile(e.id, e.role);
                        }}
                      >
                        <Avatar
                          style={{
                            border: "5px solid black",
                            width: "20vh",
                            height: "20vh",
                          }}
                          src={e.organization_profile_picture}
                        ></Avatar>
                      </IconButton>
                    </ListItemAvatar>
                  </Grid>
                  <Grid xs={3} style={{ overflow: "auto" }}>
                    <Typography variant="h5">
                      Name:{e.organization_name} <br />
                      Email:{e.email}
                    </Typography>
                  </Grid>
                  <Grid xs={3} style={{ overflow: "auto" }}>
                    <Typography variant="h5" style={{ marginLeft: "20px" }}>
                      Description:{e.organization_description} <br />
                      Address:{e.organization_address}
                    </Typography>
                  </Grid>
                  <Grid xs={3} style={{ width: "100%", display: "flex" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        xs: 2,
                        width: "100%",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        variant="contained"
                        style={{ width: "150px", backgroundColor: "green" }}
                        onClick={async () => {
                          allow(e.id);
                        }}
                      >
                        <CheckCircleOutline />
                        อนุมัติ
                      </Button>
                      <Button
                        variant="contained"
                        style={{
                          width: "150px",
                          backgroundColor: "red",
                          marginTop: "20px",
                        }}
                        onClick={() => {
                          deleteAdminOrganization(
                            e.id,
                            e.organization_profile_picture,
                            e.organization_signature,
                          );
                        }}
                      >
                        <RemoveCircleOutline />
                        ไม่อนุมัติ
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default AllowAdmin;
