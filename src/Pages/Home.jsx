import React from "react";
import { Registro } from "../Componentes/Registro";
import { MenuJogadores } from "../Componentes/MenuJogadores";
import { Gerador } from "../Componentes/Gerador";

export const Home = () => {
    return(
        <>
            <h1>Sorteador de duplas</h1>
            <Registro/>
            <h1>Gerador da liga</h1>
            <Gerador/>
        </>
    )
}