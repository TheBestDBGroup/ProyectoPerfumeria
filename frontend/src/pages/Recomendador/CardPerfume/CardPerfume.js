import React from 'react';
import {List} from "tabler-react";
import './card-perfume.css';
import { Link as DomLink } from 'react-router-dom'


//const noCumple = ['Edad', 'Género','Tipo','Personalidad','Hola', 'Hola','Holaaa','Holaa','Holaaaaaaaaaaaa', 'Holaaaa']
const CardPerfume = ({perfume}) => {
	return (
		<div className="sidebar-wrapper">

			<div className="center">
				<h6 className="titulo-perfume">{perfume.nombre_perfume} </h6>
			</div>
			<div className="center">
				<p className="id-perfume"> ID: {perfume.id_perfume} ,</p>
				<p> Tipo: {perfume.tipo_perfume} </p>
			</div>
			<div className="center">
				<p className="id-perfume"> Genero: {perfume.genero_perfume} ,</p>
				<p> Edad: {perfume.edad_perfume} </p>
			</div>

			{/*
			<div className="center">
			<h6> No Cumple: </h6>
			</div>
			<div>
				<p className="id-perfume">{noCumple.map(crit => `${crit}, `)}</p>
			</div>
			*/}


		</div>
	);
}

export default CardPerfume;