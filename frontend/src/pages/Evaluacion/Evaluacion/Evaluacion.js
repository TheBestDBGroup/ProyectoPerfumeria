import React from 'react';
import './evaluacion-styles.css';
import ChooseEvalType from '../ChooseEvalType/ChooseEvalType'
import SubHeader from '../../../components/Subheader/Subheader'
import InfoProdSubheader from '../../../components/InfoProdSubheader/InfoProdSubheader'
import { Redirect } from 'react-router-dom'

const subheaderLinks = [
	{
		linkName: "Crear Evaluación",
		linkRef: "/evaluacion/evaluar/crear-evaluacion",
	},
	{
		linkName: "Realizar Evaluación",
		linkRef: "/evaluacion/evaluar/realizar-evaluacion",
	},
	{
		linkName: "Cancelar Contrato",
		linkRef: "/contrato/ver-vigentes",
	}
]

const Evaluacion = () => {

	const productorId = localStorage.getItem('id_productor');
	
	
	if(productorId){
		return (
			<>
				<SubHeader subheaderLinks={subheaderLinks}/>
				<InfoProdSubheader redirectDir={'evaluacion'}/>
			</>
		)
	}
	else {

		//Redirect DOM to elegirProd/evaluacion
		return <Redirect to="/elegirProd/evaluacion" />

	}
}


export default Evaluacion 