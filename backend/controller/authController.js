import db from "../models/index.js"

export const registrarJogador = async(req, res) => {
    try{
        const {nome, pontos} = req.body

        const existente = await db.Jogador.findOne({where: {nome}})

        if(existente){
            return res.status(400).json({mensagem: "Nome do jogador ja registrado"})
        }

        const novoJogador = await  db.Jogador.create({nome, pontos})

        res.status(201).json({
            mensagem: "Jogador criado com sucesso",
            Jogador: novoJogador
        })

    }catch(err){
        res.status(500).json({
            mensagem: "Erro ao registrar o jogador",
            detalhes: err.message
        })
    }
}