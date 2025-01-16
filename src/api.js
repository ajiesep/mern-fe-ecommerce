import axios from "axios";

const customAPI = axios.create({
  baseURL: "/api/V1",
});

export default customAPI;
