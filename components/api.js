import axios from "axios";

// Pode ser algum servidor executando localmente: 
// http://localhost:3000
const api = axios.create({
  baseURL: "https://peppertools.herokuapp.com",
  headers: {'Content-Type': 'application/json'
  }
});

export default api;