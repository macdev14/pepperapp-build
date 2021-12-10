import axios from "axios";

// Pode ser algum servidor executando localmente: 

const api = axios.create({
  //baseURL: "https://peppertools-test.herokuapp.com",
  //baseURL: "http://localhost:8000",
  baseURL: "http://127.0.0.1:8000",
  headers: {'Content-Type': 'application/json'}
});

export default api;