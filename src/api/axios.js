import * as axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8081",
});

export function getPictureURL(data){
  const url = '/getpictureurl'
  return instance.post(url,data)
}