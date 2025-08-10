import axios from "axios";
import React from "react";

const API = axios.create({
  baseURL: 'http://localhost:3000',
  headers:{
    'Content-Type': 'application/json'
  }
});

export const registrarJogador = (dados) => API.post('/registrarJogador', dados)
export const verJogadores = () => API.get('/jogadores')
export const editarJogador = (dados) => API.put('/editarJogador', dados)
