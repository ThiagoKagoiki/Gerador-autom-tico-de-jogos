import React, { useEffect, useState } from "react";
import { MenuJogadores } from "./MenuJogadores";
import axios from "axios";

export const Gerador = () => {

  const [totalJogadores, setTotalJogadores] = useState('');
  const [jogadoresPorGrupo, setJogadoresPorGrupo] = useState('');
  const [jogadores, setJogadores] = useState([]);
  const [nome, setNome] = useState('')

    const carregarJogadores = () => {
        axios.get("http://localhost:3000/jogadores")
            .then(res => setJogadores(res.data))
            .catch(err => console.error("Erro ao buscar jogadores:", err));
    }

    const handleSubmit = () => {

    }

    useEffect(() => {
        carregarJogadores()
    }, [carregarJogadores]);
    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>

                    <label htmlFor="totalJogadores">
                        <h3>Quantos jogadores:</h3>
                    </label>
                    <input
                        type="number"
                        placeholder="Digite o total de jogadores"
                    />


                    <label htmlFor="jogadoresPorGrupo">
                        <h3>Quantos jogadores por grupo:</h3>
                    </label>
                    <input
                        type="number"
                        placeholder="Digite a quantidade por grupo"
                    />


                    <label htmlFor="jogadoresSelecionados">
                        <h3>Jogadores cadastrados:</h3>
                    </label>
                    <MenuJogadores jogadores={jogadores} nome={nome} setNome={setNome}/>

                    <br />

                    <button type="submit">Enviar</button>
                </form>
            </div>

        </>
    )
}