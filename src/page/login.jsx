import {
  AppBar,
  Button,
  Card,
  CircularProgress,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useEffect } from "react";
import { Service } from "../api/service";
import { useState } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);

  const services = new Service();

  function goBack() {
    navigate(-1);
  }

  function goToHomeAfterLogin(id, email, password) {
    console.log(id);
    console.log(email);
    console.log(password);
    navigate(`/homeAfterLogin?id=${id}&email=${email}&password=${password}`);
  }

  function goToHomeAfterLoginAdmin(id, email, password) {
    console.log(id);
    console.log(email);
    console.log(password);
    navigate(
      `/homeAfterLoginAdmin?id=${id}&email=${email}&password=${password}`
    );
  }

  function goToHomePage() {
    navigate(`/`);
  }

  function goToRegisterPage() {
    navigate(`/register`);
  }

  let email = "";
  let password = "";

  useEffect(() => {
    autoLoad();
  }, []);

  const autoLoad = async () => {
    console.log();

    setLoading(true);
    try {
      const res = await services.getAllUsersData();
      console.log(res);
      setUsers(res);
    } catch (error) {
      console.error("Failed to load Users:", error);
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
        <div
          style={{
            backgroundImage: 'url("src/assets/wall4k.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" style={{ backgroundColor: "skyblue" }}>
              <Toolbar style={{ justifyContent: "space-between" }}>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                >
                  <HomeIcon />
                </IconButton>
                <span></span>

                <Button
                  style={{
                    display: "flex",
                    width: "100px",
                    backgroundColor: "blue",
                    color: "white",
                    borderRadius: "30px",
                    boxShadow: " 1px 1px 1px 1px",
                  }}
                  onClick={() => {
                    goBack();
                  }}
                >
                  <ArrowBackIosIcon style={{ marginRight: "5%" }} />
                  Back
                </Button>
              </Toolbar>
            </AppBar>
          </Box>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Card
              style={{
                display: "flex",
                // justifyContent:'flex-end',
                flexDirection: "column",
                alignItems: "center",
                marginTop: "15vh",
                width: "30%",
                height: "80vh",
                backgroundColor: "skyblue",
                borderRadius: "30px",
                marginRight: "5%",
                minWidth: "400px",
              }}
            >
              <img
                style={{ width: "200px" }}
                src="src\assets\TPMS_logo.png"
                alt=""
              />
              <Typography variant="h4">TPMS</Typography>
              <Typography variant="h5">เข้าสู่ระบบ</Typography>

              <TextField
                placeholder="Email"
                sx={{ m: 1, width: "90%" }}
                type="email"
                id="email"
                autoComplete="current-email"
                onChange={(e) => {
                  email = e.target.value;
                  console.log(email);
                }}
                InputProps={{
                  sx: { borderRadius: "50px", bgcolor: "white" },
                  startAdornment: (
                    <EmailIcon
                      fontSize="large"
                      sx={{ color: "black", marginRight: "20px" }}
                    />
                  ),
                }}
              />

              <TextField
                placeholder="Password"
                sx={{ m: 1, width: "90%" }}
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  password = e.target.value;
                  console.log(password);
                }}
                InputProps={{
                  sx: { borderRadius: "50px", bgcolor: "white" },
                  startAdornment: (
                    <LockIcon
                      fontSize="large"
                      sx={{ color: "black", marginRight: "20px" }}
                    />
                  ),
                }}
              />

              <Button
                style={{
                  marginTop: "5%",
                  // width: "100px",
                  backgroundColor: "blue",
                  color: "black",
                  borderRadius: "30px",
                  boxShadow: " 1px 1px 1px 1px",
                }}
                onClick={() => {
                  users?.map((e) => {
                    if (e.status == 1) {
                      if (email == e.email) {
                        console.log("In email");
                        if (password == e.password) {
                          if (e.role == 1) {
                            alert("สวัสดีครับ ผู้ดูแลระบบ");
                            console.log("In Password");
                            localStorage.clear();
                            localStorage.setItem("objUser", JSON.stringify(e));
                            goToHomeAfterLoginAdmin(e.id, e.email, e.password);
                          } else if (e.role == 2) {
                            alert("สวัสดีครับ ผู้ดูแลองค์กร");
                            goToHomePage();
                          } else if (e.role == 3) {
                            alert("สวัสดีครับ ผู้สอน");
                            goToHomePage();
                          } else if (e.role == 4) {
                            alert("สวัสดีครับ User");
                            console.log("In Password");
                            localStorage.clear();
                            localStorage.setItem("objUser", JSON.stringify(e));
                            goToHomeAfterLogin(e.id, e.email, e.password);
                          }
                        }
                      }
                    } else {
                      // alert("บัญชีนี้ยังไม่ถูกสร้าง")
                      console.log("บัญชีนี้ยังไม่ถูกสร้าง");
                    }
                  });
                }}
              >
                <LogoutIcon style={{ marginRight: "5%" }} />
                Login
              </Button>

              <Button
                style={{
                  marginTop: "2%",
                  // width: "100px",
                  backgroundColor: "white",
                  color: "black",
                  borderRadius: "30px",
                  boxShadow: " 1px 1px 1px 1px",
                }}
                onClick={() => {
                  goToRegisterPage();
                }}
              >
                <HowToRegIcon style={{ marginRight: "5%" }} />
                Register
              </Button>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginPage;
