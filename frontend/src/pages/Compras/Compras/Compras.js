import React from 'react';
//import './evaluacion-styles.css';
import ChooseEvalType from '../ChooseEvalType/ChooseEvalType'
import SubHeader from '../../../components/Subheader/Subheader'
import InfoProdSubheader from '../../../components/InfoProdSubheader/InfoProdSubheader'
import { Redirect } from 'react-router-dom'

const subheaderLinks = [
	{
		linkName: "Realizar Pedido",
		linkRef: "/evaluacion/evaluar/crear-evaluacion",
	},
	{
		linkName: "Ver Estado Pedido",
		linkRef: "/evaluacion/evaluar/realizar-evaluacion",
	},
	{
		linkName: "Aceptar o Rechazar Pedido",
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