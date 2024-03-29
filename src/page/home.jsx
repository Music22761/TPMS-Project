import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from "@mui/icons-material/Search";
import { Button, CardActionArea, CardMedia, CircularProgress, Grid } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { Service } from "../api/service";
import { useState } from "react";
import { useEffect } from "react";

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

function HomePage() {
  const services = new Service();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [courses,setCourses] = useState([]);

  function goToLogin() {
    navigate("/login");
  }

  useEffect(() => {
    autoLoad();
  }, []);

  const autoLoad = async () => {

    setLoading(true);
    try {

      const resCourse = await services.getAllCourse();
      setCourses(resCourse);
      console.log(resCourse);
      
    } catch (error) {
      console.error("Failed to load User:", error);
    } finally {
      setLoading(false);
    }
  };

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
                <Button
                  style={{
                    width: "100px",
                    backgroundColor: "blue",
                    color: "white",
                    borderRadius: "30px",
                    boxShadow: " 1px 1px 1px 1px",
                  }}
                  onClick={() => {
                    goToLogin();
                  }}
                >
                  <LoginIcon style={{ marginRight: "5%" }} />
                  Login
                </Button>
              </Toolbar>
            </AppBar>
          </Box>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "70vh",
              marginTop: "15vh",
              marginBottom: "5%",
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

export default HomePage;
