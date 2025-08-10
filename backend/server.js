import express from 'express'
import dotenv from 'dotenv';
import db from './models/index.js'
import cors from 'cors';
import { editarJogador, registrarJogador, verJogadores } from './controller/authController.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express()

app.use(cors({
  origin: 'http://localhost:5174',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

app.use(express.json())

app.post('/registrarJogador', registrarJogador)
app.get('/jogadores', verJogadores)
app.put('/editarJogador', editarJogador)

db.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor da clínica rodando na porta ${PORT}`));
  })
  .catch((err) => {
    console.error("Erro ao sincronizar com o banco:", err);
  });