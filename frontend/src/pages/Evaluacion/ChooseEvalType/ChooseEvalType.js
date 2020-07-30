import React from 'react';
import './choose-eval-type-styles.css';
import InfoProdSubheader from '../../../components/InfoProdSubheader/InfoProdSubheader'
import {Button} from "tabler-react";
import { Link as DomLink } from 'react-router-dom'
import { useHistory } from "react-router-dom";


//Da a escoger entre los dos tipos de evaluacion

const ChooseEvalType = (props) => {

	const tipo = props.match.params.tipo
	let title= tipo === 'crear-evaluacion'?'crear':'realizar'
	const history = useHistory();

	const handleRedirect = (tipoRedirect) => {
		history.push(`/${tipo}/${tipoRedirect}`)
	}


	return (
		<>
			<InfoProdSubheader redirectDir={`evaluacion`}/>

			<h1 className="choose-eval-titulo"> {`Seleccione el tipo de evaluación a ${title}`} </h1>

			<div className="choose-eval-buttons">
			
				<Button.List>
					  <Button block color="primary" onClick={() => handleRedirect('inicial')}>
					    Tipo Inicial
					  </Button>
					  <Button block color="secondary" onClick={() => handleRedirect('renovacion')}>
					    Tipo Renovación
					  </Button>
				</Button.List>
			</div>
		</>
	)
}


export default ChooseEvalType