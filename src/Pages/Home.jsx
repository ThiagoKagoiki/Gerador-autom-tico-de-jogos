import React from "react";
import { Registro } from "../Componentes/Registro";
import { MenuJogadores } from "../Componentes/MenuJogadores";
import { Gerador } from "../Componentes/Gerador";
import './style.css'

export const Home = () => {
    return (
        <div className="home-container">
            <h1 className="titulo">Sorteador de Duplas</h1>
            <Registro />
            <h1 className="titulo subtitulo">Gerador da Liga</h1>
            <Gerador />
        </div>
    )
}