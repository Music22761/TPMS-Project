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
import { useRef, useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import "../css/avatar.css";
import { Service } from "../api/service";

function InstructorRegister() {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);

  const [profile, setProfile] = useState(null);
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

  const services = new Service();

  function openFileInput() {
    fileInputRef.current.click();
  }

  function handleProfileSelect(event) {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);

    const formData = new FormData();
    formData.append("file", file);

    setImageUrl(imageUrl);
    setProfile(formData);
    // ทำอะไรกับไฟล์ที่ถูกเลือก เช่น อ่านข้อมูลหรืออัพโหลดไปยังเซิร์ฟเวอร์
  }

  function handleCVFileSelect(event) {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    setCvFile(formData);
    // ทำอะไรกับไฟล์ที่ถูกเลือก เช่น อ่านข้อมูลหรืออัพโหลดไปยังเซิร์ฟเวอร์
  }

  function handleSignatureSelect(event) {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    setSignature(formData);
    // ทำอะไรกับไฟล์ที่ถูกเลือก เช่น อ่านข้อมูลหรืออัพโหลดไปยังเซิร์ฟเวอร์
  }

  async function uploadFileOnFireBase(
    username,
    email,
    password,
    nameTh,
    lastNameTh,
    nameEn,
    lastNameEn,
    phoneNumber,
    profile,
    cvfile,
    signature
  ) {
    console.log("ImageOnfireBase: " + profile);
    console.log("SignatureOnfireBase: " + signature);
    console.log("CvOnfireBase: " + cvfile);

    const resProfile = await services.postPictureOnFireBase(profile);
    const parsedData1 = JSON.parse(resProfile); //แปลงค่าเป็น json
    const urlProfile = parsedData1.url; //ดึงค่า json ที่อยู่ใน column url ออกมา
    console.log("Profile URL: " + urlProfile);

    const resSignature = await services.postPictureOnFireBase(signature);
    const parsedData2 = JSON.parse(resSignature); //แปลงค่าเป็น json
    const urlSignature = parsedData2.url; //ดึงค่า json ที่อยู่ใน column url ออกมา
    console.log("Signature URL: " + urlSignature);

    const resCV = await services.postFilePDFOnFireBase(cvfile);
    const parsedData3 = JSON.parse(resCV); //แปลงค่าเป็น json
    const urlCV = parsedData3.url; //ดึงค่า json ที่อยู่ใน column url ออกมา
    console.log("Resume URL: " + urlCV);

    await btnRegister(
      username,
      email,
      password,
      nameTh,
      lastNameTh,
      nameEn,
      lastNameEn,
      phoneNumber,
      urlProfile,
      urlCV,
      urlSignature
    );
  }

  async function btnRegister(
    username,
    email,
    password,
    nameTh,
    lastNameTh,
    nameEn,
    lastNameEn,
    phoneNumber,
    profile,
    cvfile,
    signature
  ) {
    const body = {
      email: email,
      password: password,
      name_th: nameTh + " " + lastNameTh,
      name_en: nameEn + " " + lastNameEn,
      account_name: username,
      description: null,
      phone_number: phoneNumber,
      profile_picture: profile,
      cv: cvfile,
      signature: signature,
      qr_code: null,
      role: 3,
      status: 0,
    };
    console.log("After setState: " + username);
    console.log("After setState: " + email);
    console.log("After setState: " + password);
    console.log("After setState: " + nameTh);
    console.log("After setState: " + lastNameTh);
    console.log("After setState: " + nameEn);
    console.log("After setState: " + phoneNumber);
    console.log("After setState: " + profile);
    console.log("After setState: " + cvfile);
    console.log("After setState: " + signature);
    console.log("Body: " + body);

    await services.postInstructorRegister(body);

    alert("สมัครสมาชิกสำเร็จ");
    goToHomePage();
  }

  function goBack() {
    navigate(-1);
  }

  function goToHomePage() {
    navigate(`/`);
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
                onChange={handleProfileSelect}
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
                      <TextField
                        type="file"
                        variant="outlined"
                        onChange={handleCVFileSelect}
                        // ref={fileInputRef}
                      />
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

                      <TextField
                        type="file"
                        variant="outlined"
                        onChange={handleSignatureSelect}
                        // ref={fileInputRef}
                      />
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
                if (
                  (username != null) | undefined &&
                  (email != null) | undefined &&
                  (password != null) | undefined &&
                  (confirmPassword != null) | undefined &&
                  (nameTh != null) | undefined &&
                  (lastNameTh != null) | undefined &&
                  (nameEn != null) | undefined &&
                  (lastNameEn != null) | undefined &&
                  (phone != null) | undefined &&
                  (profile != null) | undefined &&
                  (cvFile != null) | undefined &&
                  (signature != null) | undefined
                ) {
                  if (password === confirmPassword) {
                    uploadFileOnFireBase(
                      username,
                      email,
                      password,
                      nameTh,
                      lastNameTh,
                      nameEn,
                      lastNameEn,
                      phone,
                      profile,
                      cvFile,
                      signature
                    );
                    // username.trim()
                    alert("ผ่านๆๆ");
                    
                  }else{
                    alert("รหัสผ่านไม่ตรงกัน !!!");
                  }
                }else {

                  alert("กรุณากรอกข้อมูลให้ครบทุกช่อง !!!");
                }

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
