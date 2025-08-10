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

export const verJogadores = async(req, res) => {
    try {
        const jogadores = await db.Jogador.findAll({
            attributes: ['id', 'nome', 'pontos']
        });

        res.status(200).json(jogadores);
    } catch (err) {
        console.error("Erro ao listar jogadores:", err);
        res.status(500).json({ mensagem: "Erro ao listar jogadores" });
    }
}