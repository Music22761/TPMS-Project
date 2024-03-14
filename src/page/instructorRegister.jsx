import {
  AppBar,
  Avatar,
  Button,
  Card,
  Grid,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import HomeIcon from "@mui/icons-material/Home";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import BadgeIcon from "@mui/icons-material/Badge";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useRef, useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import "../css/avatar.css";

function InstructorRegister() {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [signature, setSignature] = useState(null);

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [nameTh, setNameTh] = useState();
  const [lastNameTh, setLastNameTh] = useState();
  const [nameEn, setNameEn] = useState();
  const [lastNameEn, setLastNameEn] = useState();
  const [phone, setPhone] = useState();
  //   const [date, setDate] = useState(null);
  const fileInputRef = useRef(null);

  function openFileInput() {
    fileInputRef.current.click();
  }

  function handleFileSelect(event) {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
    // ทำอะไรกับไฟล์ที่ถูกเลือก เช่น อ่านข้อมูลหรืออัพโหลดไปยังเซิร์ฟเวอร์
  }

  //   function handleFileSelect(event) {
  //     const file = event.target.files[0];
  //     const imageUrl = URL.createObjectURL(file);
  //     setImageUrl(imageUrl);
  //     // ทำอะไรกับไฟล์ที่ถูกเลือก เช่น อ่านข้อมูลหรืออัพโหลดไปยังเซิร์ฟเวอร์
  //   }

  function goBack() {
    navigate(-1);
  }

  function goToLoginPage() {
    navigate(`/login`);
  }

  function handleMouseEnter(event) {
    event.target.style.backgroundColor = "darkgray";
  }

  function handleMouseLeave(event) {
    event.target.style.backgroundColor = "white";
  }

  return (
    <>
      <div>
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

        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "15vh",
              width: "90%",
              height: "80vh",
              backgroundColor: "skyblue",
              borderRadius: "30px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileSelect}
                ref={fileInputRef}
              />
              <Avatar
                style={{
                  marginTop: "20px",
                  marginLeft: "10%",
                  width: "150px",
                  height: "150px",
                  border: "5px solid black",
                  backgroundColor: "white",
                  cursor: "pointer",
                  transition: "transform 0.3s ease-in-out",
                }}
                src={
                  imageUrl ||
                  "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
                }
                alt="Selected Image"
                onClick={openFileInput}
                onMouseEnter={handleMouseEnter} // เพิ่ม event handler onMouseEnter
                onMouseLeave={handleMouseLeave} // เพิ่ม event handler onMouseLeave
              />

              <span></span>
              <Typography variant="h4">ลงทะเบียน</Typography>
              <span></span>
              <img
                style={{ width: "200px", marginRight: "10%" }}
                src="src\assets\TPMS_logo.png"
                alt=""
              />
            </div>

            <Grid container spacing={4} style={{ margin: "0 auto" }}>
              <Grid xs={4}>
                <div>
                  {inputText(
                    "ชื่อบัญชี (Username)",
                    "text",
                    "username",
                    username,
                    <BadgeIcon
                      fontSize="large"
                      style={{ marginRight: "20px", color: "black" }}
                    />,
                    "username"
                  )}
                  {inputText(
                    "Email",
                    "email",
                    "email",
                    email,
                    <EmailIcon
                      fontSize="large"
                      style={{ marginRight: "20px", color: "black" }}
                    />,
                    "email"
                  )}
                  {inputText(
                    "Password",
                    "password",
                    "password",
                    password,
                    <LockIcon
                      fontSize="large"
                      style={{ marginRight: "20px", color: "black" }}
                    />,
                    "password"
                  )}
                  {inputText(
                    "ConfirmPassword",
                    "password",
                    "confirmPassword",
                    confirmPassword,
                    <LockIcon
                      fontSize="large"
                      style={{ marginRight: "20px", color: "black" }}
                    />,
                    "confirmPassword"
                  )}
                </div>
              </Grid>

              <Grid xs={4}>
                <div>
                  {inputText(
                    "ชื่อจริงเป็นภาษาไทย (Firstname in Thai)",
                    "text",
                    "nameTh",
                    nameTh,
                    <BadgeIcon
                      fontSize="large"
                      style={{ marginRight: "20px", color: "black" }}
                    />,
                    "nameTh"
                  )}
                  {inputText(
                    "นามสกุลภาษาไทย (Lastname in Thai)",
                    "text",
                    "lastNameTh",
                    lastNameTh,
                    <BadgeIcon
                      fontSize="large"
                      style={{ marginRight: "20px", color: "black" }}
                    />,
                    "lastNameTh"
                  )}
                  {inputText(
                    "ชื่อจริงเป็นภาษาอังกฤษ (Firstname in English)",
                    "text",
                    "nameEn",
                    nameEn,
                    <BadgeIcon
                      fontSize="large"
                      style={{ marginRight: "20px", color: "black" }}
                    />,
                    "nameEn"
                  )}
                  {inputText(
                    "นามสกุลเป็นภาษาอังกฤษ (Lastname in English)",
                    "text",
                    "lastNameEn",
                    lastNameEn,
                    <BadgeIcon
                      fontSize="large"
                      style={{ marginRight: "20px", color: "black" }}
                    />,
                    "lastNameEn"
                  )}
                </div>
              </Grid>

              <Grid xs={4}>
                <div>
                  {inputText(
                    "เบอร์โทรศัพท์ (Phone Number)",
                    "text",
                    "phone",
                    phone,
                    <PhoneIcon
                      fontSize="large"
                      style={{ marginRight: "20px", color: "black" }}
                    />,
                    "phone"
                  )}
                  <Grid container>
                    <Grid xs={8}>
                      {inputText(
                        "CV (Curriculum Vitae) หรือ Resume",
                        "file",
                        "cvFile",
                        cvFile,
                        <UploadFileIcon
                          fontSize="large"
                          style={{ marginRight: "20px", color: "black" }}
                        />,
                        "cvFile"
                      )}
                    </Grid>
                    <Grid
                      xs={4}
                      style={{
                        display: "flex",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h5">Resume</Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid xs={8}>
                      {inputText(
                        "ลายเซ็น (Signature)",
                        "file",
                        "signature",
                        signature,
                        <UploadFileIcon
                          fontSize="large"
                          style={{ marginRight: "20px", color: "black" }}
                        />,
                        "signature"
                      )}
                    </Grid>
                    <Grid
                      xs={4}
                      style={{
                        display: "flex",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h5">Signature</Typography>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
            <Button
              style={{
                //   marginTop: "20px",
                height: "10%",
                backgroundColor: "white",
                color: "black",
                borderRadius: "30px",
                boxShadow: " 1px 1px 1px 1px",
              }}
              onClick={() => {
                goToLoginPage();
                console.log("After setState: " + username);
                console.log("After setState: " + email);
                console.log("After setState: " + password);
                console.log("After setState: " + confirmPassword);
                console.log("After setState: " + nameTh);
                console.log("After setState: " + lastNameTh);
                console.log("After setState: " + nameEn);
                console.log("After setState: " + lastNameEn);
                console.log("After setState: " + cvFile);
                console.log("After setState: " + signature);
                //   console.log("After setState: " + date);
              }}
            >
              <HowToRegIcon style={{ marginRight: "5%" }} />
              Register
            </Button>
          </Card>
        </div>
      </div>
    </>
  );

  function inputText(placeholder, type, id, value, iconvalue, state) {
    return (
      <TextField
        placeholder={placeholder}
        sx={{ m: 1, width: "90%" }}
        type={type}
        id={id}
        autoComplete={"current-" + type}
        onChange={(e) => {
          value = e.target.value;
          if (state === "username") {
            setUsername(value);
          } else if (state === "email") {
            setEmail(value);
          } else if (state === "password") {
            setPassword(value);
          } else if (state === "confirmPassword") {
            setConfirmPassword(value);
          } else if (state === "nameTh") {
            setNameTh(value);
          } else if (state === "lastNameTh") {
            setLastNameTh(value);
          } else if (state === "nameEn") {
            setNameEn(value);
          } else if (state === "lastNameEn") {
            setLastNameEn(value);
          } else if (state === "phone") {
            setPhone(value);
          } else if (state === "cvFile") {
            setCvFile(value);
          } else if (state === "signature") {
            setSignature(value);
          }

          console.log(value);
        }}
        InputProps={{
          sx: { borderRadius: "50px", bgcolor: "white" },
          startAdornment: iconvalue,
        }}
      />
    );
  }
}

export default InstructorRegister;
