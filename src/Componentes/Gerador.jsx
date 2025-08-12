import React, { useEffect, useState } from "react";
import { MenuJogadores } from "./MenuJogadores";
import axios from "axios";

export const Gerador = () => {
    const [jogadores, setJogadores] = useState([]);
    const [nomeSelecionado, setNomeSelecionado] = useState("");
    const [participantes, setParticipantes] = useState([]);
    const [duplas, setDuplas] = useState([]);

    const carregarJogadores = () => {
        axios
            .get("http://localhost:3000/jogadores")
            .then((res) => setJogadores(res.data))
            .catch((err) => console.error("Erro ao buscar jogadores:", err));
    };

    const adicionarParticipante = () => {
        if (!nomeSelecionado) return;

        if (participantes.includes(nomeSelecionado)) {
            alert("Esse jogador já está na lista!");
            return;
        }

        setParticipantes([...participantes, nomeSelecionado]);
    };

    let todasDuplas = [];
    const gerarDuplas = () => {
        for (let i = 0; i < participantes.length; i++) {
            for (let j = i + 1; j < participantes.length; j++) {
                todasDuplas.push([participantes[i], participantes[j]]);
            }
        }

        if(todasDuplas.length < 4){
            alert("Precisa de no minimo 4 jogadores!")
            return
        }



        setDuplas(todasDuplas);
    };

    const removerParticipante = (nome) => {
        setParticipantes(participantes.filter((p) => p !== nome));
    };

    useEffect(() => {
        carregarJogadores();
    }, [carregarJogadores]);

    

    return (
        <div>
            <h3>Escolha um jogador:</h3>
            <MenuJogadores
                jogadores={jogadores}
                nome={nomeSelecionado}
                setNome={setNomeSelecionado}
            />

            <button onClick={adicionarParticipante} style={{ marginTop: "10px" }}>
                Adicionar à lista
            </button>

            <h3 style={{ marginTop: "20px" }}>Participantes:</h3>
            <ul>
                {participantes.map((jogador, index) => (
                    <li key={index}>
                        {jogador}
                        <button
                            onClick={() => removerParticipante(jogador)}
                            style={{ marginLeft: "10px" }}
                        >
                            Remover
                        </button>
                    </li>
                ))}
            </ul>

            <button onClick={gerarDuplas}>Gerar duplas</button>

            {duplas.length > 0 && (
                <>
                    <h3>Duplas geradas:</h3>
                    <ul>
                        {duplas.map((dupla, index) => (
                            <li key={index}>
                                {index + 1} - {dupla[0]} e {dupla[1]}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};
