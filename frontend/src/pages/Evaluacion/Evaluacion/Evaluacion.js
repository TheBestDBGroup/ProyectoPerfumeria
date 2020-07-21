import React from 'react';
import './evaluacion-styles.css';
import FiltroProductor from '../../../components/FiltroProductor/FiltroProductor.js'
import ChooseEvalType from '../ChooseEvalType/ChooseEvalType.js'
import { Redirect } from 'react-router-dom'


//Redirigir a ChooseEvalType si tiene filtro de productor
//Si no tiene filtro de productor, redirigir al usuario para que elija el
//filtro de productor 
//Filtro de productor es una variable de localstorage
//Filtro de productor se muestra en subheader de las otras cosas

const Evaluacion = () => {

	const productorId = localStorage.getItem('id_productor');
	
	
	if(productorId){
		return <ChooseEvalType/>
	}
	else {

		//Redirect DOM to elegirProd/evaluacion
		return <Redirect to="/elegirProd/evaluacion" />

	}
}


export default Evaluacion 