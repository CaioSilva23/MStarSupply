import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:5000/",
  headers: {
    "Content-Type": "application/json",
 
  },
});


export const getMercadoriasApi = () => {
  return api.get("/mercadoria");
};

export const postMercadoriasApi = (data) => {
  return api.post("/mercadoria", data);
};

export const deleteMercadoriaApi = (id) => {
  return api.delete(`/mercadoria/${id}`)
}

export const updateMercadoriaApi = (id, data) => {
  return api.put(`/mercadoria/${id}`, data)
}

