import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
const HOST = "http://localhost:3000/";

export class Service {
  async getAllUser() {
    const url = HOST + `user`;
    const response = await axios.get(url);
    const users = response.data;
    return users;
  }

    async getUserById(id) {
      const url = HOST + `user/idx?id=${id}`;
      const response = await axios.get(url);
      const user = response.data;
      return user;
    }

  //   async postPictureOnFireBase(file:FormData) {
  //     const url = HOST + `image/`;
  //     const response = await axios.post(url,file);
  //     const res = response.data
  //     console.log(res);
  //     return (res)
  //   }

  async postUserRegister(body) {
    const url = HOST + `user/`;
    const response = await axios.post(url, body);
    const res = response.data;
    console.log(res);
  }

  //   async putUserEdit(body: { name: string | undefined; email: string | undefined },id:number) {
  //     const url = HOST + `user/edit/${id}`;
  //     const response = await axios.put(url,body);
  //     const res = response.data
  //     console.log(res);

  //   }

  //   async putUserPassword(body: { password: string | undefined},id:number) {
  //     const url = HOST + `user/edit/${id}`;
  //     const response = await axios.put(url,body);
  //     const res = response.data
  //     console.log(res);

  //   }

  //   async getAllPicture() {
  //     const url = HOST + `picture`;
  //     const response = await axios.get(url);
  //     const pictures: PictureGetResponse[] = response.data;
  //     return pictures;
  //   }

  //   async getPictureById(id: number) {
  //     const url = HOST + `picture/${id}`;
  //     const response = await axios.get(url);
  //     const user: PictureGetResponse[] = response.data;
  //     return user;
  //   }

  //   async getPictureByUID(id: number) {
  //     const url = HOST + `picture/uid/${id}`;
  //     const response = await axios.get(url);
  //     const user: PictureGetResponse[] = response.data;
  //     return user;
  //   }

  //   async postPicture(body:{ name:string | undefined; score:number | undefined; user_id:number | undefined; path:string|undefined}) {
  //     const url = HOST + `picture/`;
  //     const response = await axios.post(url,body);
  //     const res = response.data
  //     console.log(res);
  //     return (res)
  //   }

  async postPictureOnFireBase(file) {
    const url = HOST + `file/`;
    const response = await axios.post(url, file);
    const res = JSON.stringify(response.data);
    // const path = String(res).split(" ")
    console.log(res);
    return res;
  }
}
