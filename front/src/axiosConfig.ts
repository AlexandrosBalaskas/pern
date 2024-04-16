import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production" ? "api" : "http://localhost:5000";

export default axios.create({
  baseURL,
});
