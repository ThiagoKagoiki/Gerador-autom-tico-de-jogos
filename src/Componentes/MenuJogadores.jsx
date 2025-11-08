import React, { useEffect, useState } from "react";
import axios from "axios";
import '../Pages/style.css'

export const MenuJogadores = ({ jogadores, nome, setNome }) => {

  const handleOption = (e) => {
    setNome(e.target.value);
  };

  return (
    <div style={{ marginBottom: "15px" }}>
      <select
        className="input-cadastro"
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "16px",
          background: "#fff",
          cursor: "pointer"
        }}
        value={nome}
        onChange={handleOption}
      >
        <option value="">Selecione um jogador</option>
        {jogadores.map((jogador) => (
          <option key={jogador.id} value={jogador.nome}>
            {jogador.nome}
          </option>
        ))}
      </select>
    </div>
  );
};

