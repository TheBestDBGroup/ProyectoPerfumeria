import React from 'react';
import './choose-eval-type-styles.css';
import InfoProdSubheader from '../../../components/InfoProdSubheader/InfoProdSubheader'
import {Button} from "tabler-react";
import { Link as DomLink } from 'react-router-dom'


//Da a escoger entre los dos tipos de evaluacion

const ChooseEvalType = () => {
	return (
		<>
			<InfoProdSubheader redirectDir={'evaluacion'}/>

			<h1 className="choose-eval-titulo"> Seleccione el tipo de evaluación </h1>

			<div className="choose-eval-buttons">
			
				<Button.List>
					<DomLink
			          to={'/evaluacion/inicial'}
			          style={{
			            textDecoration: 'none',
			            color:'#9aa0ac'
			        }}>
					  <Button block color="primary">
					    Tipo Inicial
					  </Button>
					</DomLink>
					<DomLink
			          to={'/evaluacion/renovacion'}
			          style={{
			            textDecoration: 'none',
			            color:'#9aa0ac'
			        }}>
					  <Button block color="secondary">
					    Tipo Renovación
					  </Button>
					</DomLink>
				</Button.List>
			</div>
		</>
	)
}


export default ChooseEvalType