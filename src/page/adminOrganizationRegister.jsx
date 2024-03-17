import {
  AppBar,
  Avatar,
  Button,
  Card,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
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
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import { useRef, useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import "../css/avatar.css";
import { useEffect } from "react";
import { Service } from "../api/service";

function AdminOrganizationRegister() {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [profile, setProfile] = useState(null);
  const [signature, setSignature] = useState(null);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  // const [address, setAddress] = useState();

  const [region, setRegion] = useState([]);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState();
  const [subDistrict, setSubDistrict] = useState();

  const [organizationName, setOrganizationName] = useState();
  const [organizationAddress, setOrganizationAddress] = useState();
  const [organizationPhoneNumber, setOrganizationPhoneNumber] = useState();
  const [organizationDescription, setOrganizationDescription] = useState();
  //   const [date, setDate] = useState(null);
  const fileInputRef = useRef(null);

  const services = new Service();

  const handleChange = (event) => {
    setRegion(event.target.value);
  };

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

  function handleSignatureSelect(event) {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    setSignature(formData);

    // ทำอะไรกับไฟล์ที่ถูกเลือก เช่น อ่านข้อมูลหรืออัพโหลดไปยังเซิร์ฟเวอร์
  }

  async function uploadFileOnFireBase(
    organizationName,
    email,
    password,
    organizationAddress,
    organizationPhoneNumber,
    organizationDescription,
    profile,
    signature
  ) {
    console.log("ImageOnfireBase: " + profile);
    console.log("SignatureOnfireBase: " + signature);

    const resProfile = await services.postPictureOnFireBase(profile);
    const parsedData1 = JSON.parse(resProfile); //แปลงค่าเป็น json
    const urlProfile = parsedData1.url; //ดึงค่า json ที่อยู่ใน column url ออกมา
    console.log("Profile URL: " + urlProfile);

    const resSignature = await services.postPictureOnFireBase(signature);
    const parsedData2 = JSON.parse(resSignature); //แปลงค่าเป็น json
    const urlSignature = parsedData2.url; //ดึงค่า json ที่อยู่ใน column url ออกมา
    console.log("Signature URL: " + urlSignature);

    await btnRegister(
      organizationName,
      email,
      password,
      organizationAddress,
      organizationPhoneNumber,
      organizationDescription,
      urlProfile,
      urlSignature
    );
  }

  async function btnRegister(
    organizationName,
    email,
    password,
    organizationAddress,
    organizationPhoneNumber,
    organizationDescription,
    profile,
    signature
  ) {
    const body = {
      email: email,
      password: password,
      address: null,
      organization_name: organizationName,
      organization_profile_picture: profile,
      organization_address: organizationAddress,
      organization_description: organizationDescription,
      organization_phone_number: organizationPhoneNumber,
      organization_signature: signature,
      qr_code: null,
      status: 0,
      role: 2,
    };

    console.log("After setState: " + email);
    console.log("After setState: " + password);
    console.log("After setState: " + organizationName);
    console.log("After setState: " + organizationAddress);
    console.log("After setState: " + organizationPhoneNumber);
    console.log("After setState: " + organizationDescription);
    console.log("After setState: " + profile);
    console.log("After setState: " + signature);
    console.log("Body: " + body);

    await services.postAdminOrganizationRegister(body);

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

  useEffect(() => {
    autoLoad();
  }, []);

  const autoLoad = async () => {
    console.log();

    setLoading(true);
    try {
      const resRegion = await services.getAllRegion();
      const resProvince = await services.getAllProvince();

      console.log(resRegion);
      console.log(resProvince);

      setRegion(resRegion);
      setProvince(resProvince);
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
                height: "80%",
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

              <Grid
                container
                spacing={4}
                columns={{ xs: 4, sm: 8, md: 12 }}
                style={{ margin: "0 auto" }}
              >
                <Grid xs={4}>
                  <div>
                    {inputText(
                      "ชื่อองค์กร (Organization Name)",
                      "text",
                      "organizationName",
                      organizationName,
                      <BadgeIcon
                        fontSize="large"
                        style={{ marginRight: "20px", color: "black" }}
                      />,
                      "organizationName"
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
                      "เบอร์โทรติดต่อองค์กร",
                      "text",
                      "organizationPhoneNumber",
                      organizationPhoneNumber,
                      <PhoneIcon
                        fontSize="large"
                        style={{ marginRight: "20px", color: "black" }}
                      />,
                      "organizationPhoneNumber"
                    )}
                    {inputText(
                      "ที่ตั้งองค์กร (Organization Location)",
                      "text",
                      "organizationAddress",
                      organizationAddress,
                      <LocationOnIcon
                        fontSize="large"
                        style={{ marginRight: "20px", color: "black" }}
                      />,
                      "organizationAddress"
                    )}

                    <Grid container style={{ padding: "10px" }}>
                      <Grid xs={6}>
                        <FormControl style={{ minWidth: "80%" }}>
                          <InputLabel id="demo-simple-select-label">
                            Region
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={region}
                            label="Region"
                            onChange={handleChange}
                          >
                            {region?.map((e) => (
                              <MenuItem key={e.id} value={e.id}>
                                {e.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid xs={6}>
                        <FormControl style={{ minWidth: "80%" }}>
                          <InputLabel id="demo-simple-select-label">
                            Province
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={province}
                            label="Age"
                            onChange={handleChange}
                          >
                            {/* เริ่มต้นที่การ map กับ array ของ province */}
                            {province?.map((e) => (
                              <MenuItem key={e.id} value={e.id}>
                                {e.name_th}
                              </MenuItem>
                            ))}
                            {/* สิ้นสุดการ loop */}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>

                    <Grid container style={{ padding: "10px" }}>
                      <Grid xs={6}>
                        <FormControl style={{ minWidth: "80%" }}>
                          <InputLabel id="demo-simple-select-label">
                            District
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={district}
                            label="Age"
                            onChange={handleChange}
                          >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid xs={6}>
                        <FormControl style={{ minWidth: "80%" }}>
                          <InputLabel id="demo-simple-select-label">
                            Sub Dustrict
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={subDistrict}
                            label="Age"
                            onChange={handleChange}
                          >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>

                <Grid xs={4}>
                  <div>
                    <Typography variant="h5">Signature Oganization</Typography>
                    <Grid container>
                      <Grid xs={8}>
                        <TextField
                          type="file"
                          variant="outlined"
                          onChange={handleSignatureSelect}
                          // ref={fileInputRef}
                        />
                        {inputText(
                          "รายละเอียดองค์กร",
                          "text",
                          "organizationDescription",
                          organizationDescription,
                          <DescriptionIcon
                            fontSize="large"
                            style={{ marginRight: "20px", color: "black" }}
                          />,
                          "organizationDescription"
                        )}
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
                    (email != null) | undefined &&
                    (password != null) | undefined &&
                    (confirmPassword != null) | undefined &&
                    (organizationName != null) | undefined &&
                    (organizationAddress != null) | undefined &&
                    (organizationDescription != null) | undefined &&
                    (organizationPhoneNumber != null) | undefined &&
                    (profile != null) | undefined &&
                    (signature != null) | undefined
                  ) {
                    if (password === confirmPassword) {
                      uploadFileOnFireBase(
                        organizationName,
                        email,
                        password,
                        organizationAddress,
                        organizationPhoneNumber,
                        organizationDescription,
                        profile,
                        signature
                      );
                    } else {
                      alert("รหัสผ่านไม่ตรงกัน !!!");
                    }
                  } else {
                    alert("กรุณากรอกข้อมูลให้ครบทุกช่อง !!!");
                  }
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
          } else if (state === "organizationName") {
            setOrganizationName(value);
          } else if (state === "organizationAddress") {
            setOrganizationAddress(value);
          } else if (state === "organizationPhoneNumber") {
            setOrganizationPhoneNumber(value);
          } else if (state === "organizationDescription") {
            setOrganizationDescription(value);
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
