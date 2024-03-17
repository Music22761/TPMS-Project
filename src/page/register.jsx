import {
  AppBar,
  Button,
  Card,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import HomeIcon from "@mui/icons-material/Home";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HowToRegIcon from "@mui/icons-material/HowToReg";

function RegisterPage() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  function goToUserRegister() {
    navigate(`/userRegister`);
  }

  function goToInstructorRegister() {
    navigate(`/instructorRegister`);
  }

  function goToAdminOrganizationRegister() {
    navigate(`/adminOrganizationRegister`);
  }

  return (
    <>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
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

          <Card
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems:'center',
              marginTop: "15vh",
              width: "30%",
              minWidth:'400px',
              height: "80vh",
              backgroundColor: "skyblue",
              borderRadius: "30px",
              marginRight: "5%",
            }}
          >
            <img
              style={{ width: "100px" }}
              src="src\assets\TPMS_logo.png"
              alt=""
            />
            <Typography variant="h5">
              เลือกตำแหน่งที่ต้องการลงทะเบียน
            </Typography>

            <Button
              style={{
                fontSize: "24px",
                marginTop: "10%",
                width: "90%",
                height: "10%",
                backgroundColor: "white",
                color: "black",
                borderRadius: "10px",
                boxShadow: " 1px 1px 1px 1px",
                textAlign: "start",
              }}
              onClick={() => {
                goToAdminOrganizationRegister();
              }}
            >
              <ManageAccountsIcon style={{ marginRight: "5%" }} />
              Admin Organization
            </Button>

            <Button
              style={{
                fontSize: "24px",
                marginTop: "10%",
                width: "90%",
                height: "10%",
                backgroundColor: "white",
                color: "black",
                borderRadius: "10px",
                boxShadow: " 1px 1px 1px 1px",
              }}
              onClick={() => {
                goToInstructorRegister();
              }}
            >
              <NoteAltIcon style={{ marginRight: "5%" }} />
              Instructor
            </Button>

            <Button
              style={{
                fontSize: "24px",
                marginTop: "10%",
                width: "90%",
                height: "10%",
                backgroundColor: "white",
                color: "black",
                borderRadius: "10px",
                boxShadow: " 1px 1px 1px 1px",
              }}
              onClick={() => {
                goToUserRegister();
              }}
            >
              <HowToRegIcon style={{ marginRight: "5%" }} />
              Users
            </Button>
          </Card>
      </div>
    </>
  );
}

export default RegisterPage;
