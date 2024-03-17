import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
const HOST = "http://localhost:3000/";

export class Service {
  //Getter Method

  //Get All Method
  async getAllUser() {
    const url = HOST + `user`;
    const response = await axios.get(url);
    const users = response.data;
    return users;
  }

  async getAllAdmin() {
    const url = HOST + `admin`;
    const response = await axios.get(url);
    const users = response.data;
    return users;
  }

  async getAllCourse() {
    const url = HOST + `course`;
    const response = await axios.get(url);
    const course = response.data;
    return course;
  }

  async getUserById(id) {
    const url = HOST + `user/idx?id=${id}`;
    const response = await axios.get(url);
    const user = response.data;
    return user;
  }

  async getAdminById(id) {
    const url = HOST + `admin/idx?id=${id}`;
    const response = await axios.get(url);
    const user = response.data;
    return user;
  }

  async getAllRegion() {
    const url = HOST + `address/region`;
    const response = await axios.get(url);
    const user = response.data;
    return user;
  }

  async getAllProvince() {
    const url = HOST + `address/province`;
    const response = await axios.get(url);
    const user = response.data;
    return user;
  }

  async getAllUsersData() {
    const url = HOST + `login`;
    const response = await axios.get(url);
    const user = response.data;
    return user;
  }

  async getAllAdminOrganizationNotAllow() {
    const url = HOST + `adminOrganization/notAllow`;
    const response = await axios.get(url);
    const user = response.data;
    return user;
  }

  async getAllInstructorNotAllow() {
    const url = HOST + `instructor/notAllow`;
    const response = await axios.get(url);
    const user = response.data;
    return user;
  }

  // Post Method

  async postUserRegister(body) {
    const url = HOST + `user/`;
    const response = await axios.post(url, body);
    const res = response.data;
    console.log(res);
  }

  async postInstructorRegister(body) {
    const url = HOST + `instructor/`;
    const response = await axios.post(url, body);
    const res = response.data;
    console.log(res);
  }

  async postAdminOrganizationRegister(body) {
    const url = HOST + `adminOrganization/`;
    const response = await axios.post(url, body);
    const res = response.data;
    console.log(res);
  }

  //Delete Method
  async deleteAdminOrganization(id) {
    const url = HOST + `adminOrganization/${id}`;
    const response = await axios.delete(url);
    const res = response.data;
    console.log(res);
  }

  async deleteInstructor(id) {
    const url = HOST + `instructor/${id}`;
    const response = await axios.delete(url);
    const res = response.data;
    console.log(res);
  }

  async deletePictureOnFirebase(path) {
    const url = HOST + `file/pathImage?path=`+path;
    console.log("URL: "+url);
    const response = await axios.delete(url);
    const res = response.data
    console.log(res);
    return (res)
  }

  async deletePDFOnFirebase(path) {
    const url = HOST + `file/pathPDF?path=`+path;
    console.log("URL: "+url);
    const response = await axios.delete(url);
    const res = response.data
    console.log(res);
    return (res)
  }

  //Update Method

  async putAdminOrganizationAllow(body, id) {
    const url = HOST + `adminOrganization/edit/${id}`;
    const response = await axios.put(url, body);
    const res = response.data;
    console.log(res);
  }

  async putInstructorAllow(body, id) {
    const url = HOST + `instructor/edit/${id}`;
    const response = await axios.put(url, body);
    const res = response.data;
    console.log(res);
  }


  async postPictureOnFireBase(file) {
    const url = HOST + `file/`;
    const response = await axios.post(url, file);
    const res = JSON.stringify(response.data);
    console.log(res);
    return res;
  }

  async postFilePDFOnFireBase(file) {
    const url = HOST + `file/pdf/`;
    const response = await axios.post(url, file);
    const res = JSON.stringify(response.data);
    console.log(res);
    return res;
  }
}
