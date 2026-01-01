import axios from "axios";

const client = axios.create({
  baseURL: "/", // 서버 생성 시 URL 변경
});

export default client;
