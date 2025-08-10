import React, { useEffect, useState } from "react";
import { editarJogador, registrarJogador } from "../Services/service";
import axios from "axios";
import { MenuJogadores } from "./MenuJogadores";

export const Registro = () => {

    const [nome, setNome] = useState('')
    const [pontos, setPontos] = useState('')
    const [jogadores, setJogadores] = useState([]);
    const [nomeSelecionado, setNomeSelecionado] = useState("");
    const [jogadorEditando, setJogadorEditando] = useState(null)

    const carregarJogadores = () => {
        axios.get("http://localhost:3000/jogadores")
            .then(res => setJogadores(res.data))
            .catch(err => console.error("Erro ao buscar jogadores:", err));
    }

    useEffect(() => {
        carregarJogadores()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!nome) {
            alert("Preencha o campo!")
            return
        }

        const dados = { nome }

        try {
            await registrarJogador(dados)
            setNome('')
            setPontos('')
            carregarJogadores()
        } catch (error) {
            console.error("Erro ao registrar jogador:", error.response ? error.response.data : error.message);
            alert("Erro ao registrar jogador. Verifique os dados e tente novamente.");
        }
    }

    const handleEditar = (jogador) => {
        setJogadorEditando(jogador);
        setPontos(jogador.pontos);
    }
    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        const dados = { pontos };
        try {
            await editarJogador({ id: jogadorEditando.id, ...dados }); 
            setPontos('');
            setJogadorEditando(null);
            carregarJogadores();
        } catch (error) {
            console.error("Erro ao editar jogador:", error.response ? error.response.data : error.message);
            alert("Erro ao editar jogador. Verifique os dados e tente novamente.");
        }
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <h2>Registrar jogador</h2>
                    <label htmlFor="">Nome do jogador:</label>
                    <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
                    <button type="submit">Registrar</button>
                </form>

                <h2>Lista de Jogadores</h2>
                <table className="tabela">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Pontos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jogadores.map(jogador => (
                            <tr key={jogador.id}>
                                <td>{jogador.id}</td>
                                <td>{jogador.nome}</td>
                                <td>{jogadorEditando && jogadorEditando.id === jogador.id ? (
                                    <form onSubmit={handleSubmitEdit}>
                                        <input 
                                            type="number" 
                                            value={pontos} 
                                            onChange={e => setPontos(e.target.value)} 
                                        />
                                        <button type="submit">Salvar</button>
                                    </form>
                                ) : (
                                    jogador.pontos
                                )}</td>
                                <td>
                                    <button onClick={() => handleEditar(jogador)}>Editar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* <MenuJogadores jogadores={jogadores} nome={nomeSelecionado} setNome={setNomeSelecionado}/> */}
            </div>
        </>
    )
}

