import React, { useEffect, useState } from "react";
import { MenuJogadores } from "./MenuJogadores";
import { verJogadores } from "../Services/service";

const embaralhar = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
}

export const Gerador = () => {
    const [jogadores, setJogadores] = useState([]);
    const [nomeSelecionado, setNomeSelecionado] = useState("");
    const [participantes, setParticipantes] = useState([]);
    const [jogos, setJogos] = useState([]);
    const [gruposFormados, setGruposFormados] = useState([]); // Novo estado para armazenar os grupos
    const [duplasPorGrupo, setDuplasPorGrupo] = useState([]);

    const carregarJogadores = () => {
        verJogadores()
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

    const removerParticipante = (nome) => {
        setParticipantes(participantes.filter((p) => p !== nome));
    };

    const criarGrupos = () => {
        const grupos = []
        for (let i = 0; i < participantes.length; i += 4) {
            let gp = []
            for (let j = i; j < i + 4; j++) {
                gp.push(participantes[j])
                // console.log(participantes[j])
            }
            grupos.push(gp)
        }
        // console.table(grupos)

        return grupos
    };

    const montarDuplas = (grupos) => {
        const todasDuplas = [];

        for (const grupoAtual of grupos) {
            const duplasDoGrupo = [];
            // O loop de duplas exige no mínimo 2 participantes
            if (grupoAtual.length >= 2) {
                for (let j = 0; j < grupoAtual.length; j++) {
                    const pessoaA = grupoAtual[j];
                    for (let k = j + 1; k < grupoAtual.length; k++) {
                        const pessoaB = grupoAtual[k];
                        duplasDoGrupo.push([pessoaA, pessoaB]);
                    }
                }
            }
            // Armazena as duplas junto com o grupo a que pertencem
            todasDuplas.push({
                grupo: grupoAtual,
                duplas: duplasDoGrupo,
            });
        }
        return todasDuplas;
    }

    const gerarJogos = (duplasPorGrupoParam) => {
        const todosOsJogos = [];
        for (let count = 0; count < duplasPorGrupoParam.length; count++) {
            const duplas = duplasPorGrupoParam[count].duplas;
            const tamVet = duplas.length;
            if (tamVet < 2) continue;
            console.log(tamVet)
            const limite = Math.floor(tamVet / 2);
            for (let i = 0; i < limite; i++) {
                console.log(duplasPorGrupo[count].duplas[i], "#########")
                console.log(duplasPorGrupo[count].duplas[tamVet - i - 1], "%%%%%%%%%")
                // console.log(duplasPorGrupo.duplas[i], "@@@@@@@@@@@")
                const d1 = duplas[i]
                const d2 = duplas[tamVet - i - 1]
                todosOsJogos.push({
                    grupoIndex: count,
                    jogo: [d1, d2]
                });
            }
        }
        // console.log(duplasPorGrupo[count].duplas.length)
        console.table(todosOsJogos)
        return todosOsJogos;
    }

    const iniciarSorteioDeJogos = () => {
        if (participantes.length % 4 != 0) {
            alert(`Você precisa de um número multiplo de 4, numero de participantes atual: ${participantes.length}`);
            return;
        }

        const participantesEmbaralhados = embaralhar(participantes)

        const gruposCriados = criarGrupos(participantesEmbaralhados)
        setGruposFormados(gruposCriados)

        const duplasCriadas = montarDuplas(gruposCriados)
        setDuplasPorGrupo(duplasCriadas)

        const jogosSorteados = gerarJogos(duplasCriadas)
        setJogos(jogosSorteados)

        // 2. Chama a função para embaralhar e formar os jogos
        // criarGrupos();
        // console.table(todasAsDuplas)
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

            <button onClick={iniciarSorteioDeJogos} disabled={participantes.length < 4}>Gerar duplas</button>

            {duplasPorGrupo.length > 0 && (
                <>
                    <h3 style={{ marginTop: "20px" }}>Duplas Possíveis por Grupo (Combinações):</h3>

                    {duplasPorGrupo.map((item, indexGrupo) => (
                        <div key={indexGrupo} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>

                            <h4>
                                Grupo {indexGrupo + 1}: ({item.grupo.join(', ')})
                            </h4>

                            {jogos.filter(j => j.grupoIndex === indexGrupo).length > 0 && (
                                <>
                                    <h4 style={{ marginTop: "15px" }}>Jogos Sorteados:</h4>
                                    <ul>
                                        {jogos
                                            .filter(j => j.grupoIndex === indexGrupo)
                                            .map((jogoItem, index) => {
                                                const dupla1 = jogoItem.jogo[0];
                                                const dupla2 = jogoItem.jogo[1];

                                                return (
                                                    <li key={index}>
                                                        Jogo {index + 1}: &nbsp;
                                                        <strong>{dupla1[0]} e {dupla1[1]}</strong> VS <strong>{dupla2[0]} e {dupla2[1]}</strong>
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                </>
                            )}
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};
