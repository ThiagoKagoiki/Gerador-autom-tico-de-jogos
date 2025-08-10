import React, { useEffect, useState } from "react";
import axios from "axios";

export const MenuJogadores = ({ jogadores, nome, setNome }) => {

  const handleOption = (e) => {
    setNome(e.target.value);
  };

  return (
    <div>
      <select className="input-cadastro" value={nome} onChange={handleOption}>
        <option value="">Selecione um jogador</option>
        {jogadores.map(jogador => (
          <option key={jogador.id} value={jogador.nome}>
            {jogador.nome}
          </option>
        ))}
      </select>
    </div>
  );
};

