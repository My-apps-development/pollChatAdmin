import axios from "axios";

// export const BASE_URL = "http://50.17.107.208:3004/v1";
// export const BASE_URL = "http://54.90.21.249:8002/v1";
// export const BASE_URL = "http://localhost:8080/api/v1";
export const BASE_URL = "https://pollchat.myappsdevelopment.co.in/api/v1";

// const userToken = localStorage.getItem("token");
const userToken = localStorage.getItem("token")
// const userRole =localStorage.getItem("role")
// console.log('AXIOS TOKEN',userToken)
// console.log('ROLE',JSON.parse(userRole))

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: userToken ? { Authorization: `Bearer ${userToken}` } : null,
  // headers: {
  //   'Authorization':  `Bearer ${userToken}` , // Set default headers for all requests
  //   'Content-Type': 'application/json',
  //   // 'Access-Control-Allow-Origin': 'http://54.90.21.249:8002/v1', 
  // },
});
