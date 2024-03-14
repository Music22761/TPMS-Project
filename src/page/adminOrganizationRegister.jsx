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
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import { useRef, useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import "../css/avatar.css";

function AdminOrganizationRegister() {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [signature, setSignature] = useState(null);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [address, setAddress] = useState();

  //   const [region, setRegion] = useState();
  //   const [province, setProvince] = useState();
  //   const [district, setDistrict] = useState();
  //   const [subDistrict, setSubDistrict] = useState();

  //   const [region_O, setRegion_O] = useState();
  //   const [province_O, setProvince_O] = useState();
  //   const [district_O, setDistrict_O] = useState();
  //   const [subDistrict_O, setSubDistrict_O] = useState();

  const [oragnizationName, setOragnizationName] = useState();
  const [oragnizationAddress, setOragnizationAddress] = useState();
  const [oragnizationPhoneNumber, setOragnizationPhoneNumber] = useState();
  const [oragnizationDescription, setOragnizationDescription] = useState();
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
                  {inputText(
                    "ที่อยู่",
                    "text",
                    "address",
                    address,
                    <LocationOnIcon
                      fontSize="large"
                      style={{ marginRight: "20px", color: "black" }}
                    />,
                    "address"
                  )}

                  {/* <div style={{ display: "flex", justifyContent: "center" }}>
                    <select name="cars" id="cars">
                      <option
                        value="region"
                        onChange={(e) => setRegion(e.target.value)}
                      >
                        ภูมิภาค
                      </option>
                      <option
                        value="saab"
                        onChange={(e) => setRegion(e.target.value)}
                      >
                        Saab
                      </option>
                      <option
                        value="mercedes"
                        onChange={(e) => setRegion(e.target.value)}
                      >
                        Mercedes
                      </option>
                      <option
                        value="audi"
                        onChange={(e) => setRegion(e.target.value)}
                      >
                        Audi
                      </option>
                    </select>
                    <select name="cars" id="cars">
                      <option
                        value="province"
                        onChange={(e) => setProvince(e.target.value)}
                      >
                        จังหวัด
                      </option>
                      <option
                        value="saab"
                        onChange={(e) => setProvince(e.target.value)}
                      >
                        Saab
                      </option>
                      <option
                        value="mercedes"
                        onChange={(e) => setProvince(e.target.value)}
                      >
                        Mercedes
                      </option>
                      <option
                        value="audi"
                        onChange={(e) => setProvince(e.target.value)}
                      >
                        Audi
                      </option>
                    </select>
                    <select name="cars" id="cars">
                      <option value="volvo">อำเภอ</option>
                      <option value="saab">Saab</option>
                      <option value="mercedes">Mercedes</option>
                      <option value="audi">Audi</option>
                    </select>
                    <select name="cars" id="cars">
                      <option value="volvo">ตำบล</option>
                      <option value="saab">Saab</option>
                      <option value="mercedes">Mercedes</option>
                      <option value="audi">Audi</option>
                    </select>
                  </div> */}
                </div>
              </Grid>

              <Grid xs={4}>
                <div>
                  {inputText(
                    "ชื่อองค์กร (Organization Name)",
                    "text",
                    "organizationName",
                    oragnizationName,
                    <BadgeIcon
                      fontSize="large"
                      style={{ marginRight: "20px", color: "black" }}
                    />,
                    "oragnizationName"
                  )}
                  {inputText(
                    "รายละเอียดองค์กร",
                    "text",
                    "oragnizationDescription",
                    oragnizationDescription,
                    <DescriptionIcon
                      fontSize="large"
                      style={{ marginRight: "20px", color: "black" }}
                    />,
                    "oragnizationDescription"
                  )}
                  {inputText(
                    "เบอร์โทรติดต่อองค์กร",
                    "text",
                    "oragnizationPhoneNumber",
                    oragnizationPhoneNumber,
                    <PhoneIcon
                      fontSize="large"
                      style={{ marginRight: "20px", color: "black" }}
                    />,
                    "oragnizationPhoneNumber"
                  )}
                  {inputText(
                    "ที่ตั้งองค์กร (Organization Location)",
                    "text",
                    "oragnizationAddress",
                    oragnizationAddress,
                    <LocationOnIcon
                      fontSize="large"
                      style={{ marginRight: "20px", color: "black" }}
                    />,
                    "oragnizationAddress"
                  )}
                  {/* <div style={{ display: "flex", justifyContent: "center" }}>
                    <select name="cars" id="cars" onChange={(e)=>{setRegion_O(e.target.value);console.log(e.target.value);}}>
                      <option
                        value="region_O"
                        onChange={(e) => {
                          setRegion_O(e.target.value);
                          console.log(region_O);
                        }}
                      >
                        ภูมิภาค
                      </option>
                      <option
                        value="saab"
                        onChange={(e) => setRegion_O(e.target.value)}
                      >
                        Saab
                      </option>
                      <option
                        value="mercedes"
                        onChange={(e) => setRegion_O(e.target.value)}
                      >
                        Mercedes
                      </option>
                      <option
                        value="audi"
                        onChange={(e) => setRegion_O(e.target.value)}
                      >
                        Audi
                      </option>
                    </select>
                    <select name="cars" id="cars">
                      <option
                        value="province_O"
                        onChange={(e) => setProvince_O(e.target.value)}
                      >
                        จังหวัด
                      </option>
                      <option
                        value="saab"
                        onChange={(e) => setProvince_O(e.target.value)}
                      >
                        Saab
                      </option>
                      <option
                        value="mercedes"
                        onChange={(e) => setProvince_O(e.target.value)}
                      >
                        Mercedes
                      </option>
                      <option
                        value="audi"
                        onChange={(e) => setProvince_O(e.target.value)}
                      >
                        Audi
                      </option>
                    </select>
                    <select name="cars" id="cars">
                      <option value="volvo">อำเภอ</option>
                      <option value="saab">Saab</option>
                      <option value="mercedes">Mercedes</option>
                      <option value="audi">Audi</option>
                    </select>
                    <select name="cars" id="cars">
                      <option value="volvo">ตำบล</option>
                      <option value="saab">Saab</option>
                      <option value="mercedes">Mercedes</option>
                      <option value="audi">Audi</option>
                    </select>
                  </div> */}
                </div>
              </Grid>

              <Grid xs={4}>
                <div>
                  <Typography variant="h5">Signature Oganization</Typography>
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
                    ></Grid>
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
                console.log("After setState: " + email);
                console.log("After setState: " + password);
                console.log("After setState: " + confirmPassword);
                console.log("After setState: " + address);
                console.log("After setState: " + oragnizationName);
                console.log("After setState: " + oragnizationAddress);
                console.log("After setState: " + oragnizationPhoneNumber);
                console.log("After setState: " + oragnizationDescription);
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
          if (state === "email") {
            setEmail(value);
          } else if (state === "password") {
            setPassword(value);
          } else if (state === "confirmPassword") {
            setConfirmPassword(value);
          } else if (state === "address") {
            setAddress(value);
          } else if (state === "oragnizationName") {
            setOragnizationName(value);
          } else if (state === "oragnizationAddress") {
            setOragnizationAddress(value);
          } else if (state === "oragnizationPhoneNumber") {
            setOragnizationPhoneNumber(value);
          } else if (state === "oragnizationDescription") {
            setOragnizationDescription(value);
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

export default AdminOrganizationRegister;
