import axios from "axios";

// Pode ser algum servidor executando localmente: 
// http://localhost:3000

const api = axios.create({
  baseURL: "https://peppertools.herokuapp.com",
  headers: {'Accept': 'application/json'}
});

export default api;