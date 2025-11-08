import React, { useEffect, useState } from "react";
import { MenuJogadores } from "./MenuJogadores";
import { verJogadores } from "../Services/service";

const embaralhar = (arr) => {
    // copia para não mutar o original
    const copia = [...arr];
    return copia.sort(() => Math.random() - 0.5);
}

export const Gerador = () => {
    const [jogadores, setJogadores] = useState([]);
    const [nomeSelecionado, setNomeSelecionado] = useState("");
    const [participantes, setParticipantes] = useState([]);
    const [jogos, setJogos] = useState([]);
    const [gruposFormados, setGruposFormados] = useState([]);
    const [duplasPorGrupo, setDuplasPorGrupo] = useState([]);

    const carregarJogadores = () => {
        verJogadores()
            .then((res) => setJogadores(res.data))
            .catch((err) => console.error("Erro ao buscar jogadores:", err));
    };

    useEffect(() => {
        carregarJogadores();
    }, []); // <--- melhor deixar [] aqui

    const adicionarParticipante = () => {
        if (!nomeSelecionado) return;
        if (participantes.includes(nomeSelecionado)) {
            alert("Esse jogador já está na lista!");
            return;
        }
        setParticipantes(prev => [...prev, nomeSelecionado]);
    };

    const removerParticipante = (nome) => {
        setParticipantes(prev => prev.filter((p) => p !== nome));
    };

    // agora recebe uma lista (pode ser o participantes embaralhado)
    const criarGrupos = (lista) => {
        const grupos = [];
        for (let i = 0; i < lista.length; i += 4) {
            const gp = [];
            for (let j = i; j < i + 4; j++) {
                gp.push(lista[j]);
            }
            grupos.push(gp);
        }
        return grupos;
    };

    const montarDuplas = (grupos) => {
        const todasDuplas = [];

        for (const grupoAtual of grupos) {
            const duplasDoGrupo = [];
            if (grupoAtual.length >= 2) {
                for (let j = 0; j < grupoAtual.length; j++) {
                    const pessoaA = grupoAtual[j];
                    for (let k = j + 1; k < grupoAtual.length; k++) {
                        const pessoaB = grupoAtual[k];
                        duplasDoGrupo.push([pessoaA, pessoaB]);
                    }
                }
            }
            todasDuplas.push({
                grupo: grupoAtual,
                duplas: duplasDoGrupo,
            });
        }
        return todasDuplas;
    };

    const gerarJogos = (duplasPorGrupoParam) => {
        const todosOsJogos = [];
        for (let count = 0; count < duplasPorGrupoParam.length; count++) {
            const duplas = duplasPorGrupoParam[count].duplas;
            const tamVet = duplas.length;
            if (tamVet < 2) continue;
            const limite = Math.floor(tamVet / 2);
            for (let i = 0; i < limite; i++) {
                const d1 = duplas[i];
                const d2 = duplas[tamVet - i - 1];
                todosOsJogos.push({
                    grupoIndex: count,
                    jogo: [d1, d2]
                });
            }
        }
        return todosOsJogos;
    };

    // NÃO depende de setState intermediário: calcula tudo localmente e depois atualiza estados
    const iniciarSorteioDeJogos = () => {
        if (participantes.length % 4 !== 0) {
            alert(`Você precisa de um número multiplo de 4, numero de participantes atual: ${participantes.length}`);
            return;
        }

        // calcula tudo a partir de variáveis locais
        const participantesEmbaralhados = embaralhar(participantes);
        const gruposCriados = criarGrupos(participantesEmbaralhados);
        const duplasCriadas = montarDuplas(gruposCriados);
        const jogosSorteados = gerarJogos(duplasCriadas);

        // agora atualiza o state uma vez com os resultados
        setGruposFormados(gruposCriados);
        setDuplasPorGrupo(duplasCriadas);
        setJogos(jogosSorteados);
    };

    return (
        <div className="gerador-container">
            <h3>Escolha um jogador:</h3>

            <MenuJogadores jogadores={jogadores} nome={nomeSelecionado} setNome={setNomeSelecionado} />

            <button onClick={adicionarParticipante} className="btn">Adicionar à lista</button>

            <h3>Participantes:</h3>
            <ul className="lista-participantes">
                {participantes.map((jogador, index) => (
                    <li key={index}>
                        {jogador}
                        <button onClick={() => removerParticipante(jogador)} className="btn excluir-sm">Remover</button>
                    </li>
                ))}
            </ul>

            <button onClick={iniciarSorteioDeJogos} disabled={participantes.length < 4} className="btn sortear">
                Gerar Duplas
            </button>

            {duplasPorGrupo.length > 0 && (
                <div className="grupos-container">
                    {duplasPorGrupo.map((item, indexGrupo) => (
                        <div key={indexGrupo} className="grupo-card">
                            <h4>Grupo {indexGrupo + 1}: ({item.grupo.join(', ')})</h4>

                            {jogos.filter(j => j.grupoIndex === indexGrupo).length > 0 && (
                                <ul className="lista-jogos">
                                    {jogos
                                        .filter(j => j.grupoIndex === indexGrupo)
                                        .map((jogoItem, index) => {
                                            const dupla1 = jogoItem.jogo[0];
                                            const dupla2 = jogoItem.jogo[1];

                                            return (
                                                <li key={index}>
                                                    Jogo {index + 1}:
                                                    <strong> {dupla1[0]} e {dupla1[1]} </strong> VS
                                                    <strong> {dupla2[0]} e {dupla2[1]} </strong>
                                                </li>
                                            );
                                        })}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
};
