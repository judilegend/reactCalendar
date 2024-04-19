import axios from "axios";

// Set config defaults when creating the instance
const myaxios = axios.create({
  baseURL: "http://localhost:4000/api/calendar/",
});

export default myaxios;
