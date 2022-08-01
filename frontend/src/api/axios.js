import axios from "axios";
export default axios.create({
  withCredentials: true,
  baseURL: "https://secs-api.kamari.web.id",
});
