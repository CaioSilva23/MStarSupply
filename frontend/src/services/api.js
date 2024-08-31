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

export const getMercadoriasByIdApi = (id) => {
  return api.get(`/mercadoria/${id}`);
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


// OPERACOES
export const getOperacoesApi = () => {
  return api.get("/operacao");
};

export const postOperacoesApi = (data) => {
  return api.post("/operacao", data);
};

export const getOperacoesMesApi = (id) => {
  return api.get(`/operacao/mes/${id}`);
};


