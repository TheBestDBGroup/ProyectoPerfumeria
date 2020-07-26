import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Divider, TextField, Button} from '@material-ui/core/';
import './mostrar-resultado.css'
import { useHistory } from "react-router-dom";



/*		
*/

const MostrarResultado = (props) => {
	const id_proveedor = props.match.params.idproveedor
	const id_contrato = props.match.params.idcontrato
	const status= props.match.params.status//paso true, fallo false
	const calificacion= props.match.params.calificacion
	const tipo_evaluacion = props.match.params.tipoeval
	const history = useHistory();



	const handleSubmit = (redirectDir) => {
		history.push(redirectDir);
	}

	const handleRenovarContrato = () => {
		axios.post('/create/renovacion', {
		    id_contrato: id_contrato,
		  })
		  .then((res) =>{
		    console.log('response renovacion', res.data);
		    alert('Contrato Renovado con éxito')
		    history.push(`/`);
            
		  })
		  .catch(function (error) {
		    console.log(error);
		 });
	}

	let mensaje=''
	let buttonMensaje =''
	let redirectDir=''
	let	buttonMensaje1 = ''
	let	redirectDir1 = ''
	let	buttonMensaje2 =''
	let	redirectDir2=``

	//reprobo
	if(status=== 'false') {

		mensaje=`El proveedor ha fallado su evaluacion con ${calificacion} punto(s)`
		buttonMensaje = 'Volver al menú principal'
		redirectDir = '/evaluacion'

		return (
			<>
				<div className="content-wrapper">
					<div className="center">
						<h6> {mensaje} </h6>
					</div>
					<div className="center">
						<Button 
							variant="outlined" 
							color="primary"
							size="small" 
							onClick={ e => handleSubmit(redirectDir)}
						>
							{buttonMensaje}
							
						</Button>
					</div>
				</div>
			</>

		)
	} 

	//paso y es inicial
	if(status === 'true' && tipo_evaluacion==='inicial') {

		mensaje=`El proveedor ha pasado su evaluacion con ${calificacion} puntos`
		buttonMensaje1 = 'Volver al menú principal'
		redirectDir1 = '/evaluacion'
		buttonMensaje2 ='Crear nuevo contrato'
		redirectDir2=`/contrato/crear/${id_proveedor}`


		return (
			<>
				<div className="content-wrapper">
					<div className="center">
						<h6> {mensaje} </h6>
					</div>
						<div className="center">
						<Button 
							className="button-one"
							variant="outlined" 
							color="primary"
							size="small" 
							onClick={ e => handleSubmit(redirectDir1)}
						>
							{buttonMensaje1}
							
						</Button>
						<Button 
							variant="outlined" 
							color="primary"
							size="small" 
							onClick={ e => handleSubmit(redirectDir2)}
						>
							{buttonMensaje2}
							
						</Button>
					</div>
				</div>
			</>

		)
	}

	///RENOVACIOON////

	if(status === 'true' && tipo_evaluacion==='renovacion') {

		mensaje=`El proveedor ha pasado su evaluacion con ${calificacion} puntos`
		buttonMensaje ='Renovar contrato'
		buttonMensaje1 = 'Volver al menú principal'
		redirectDir1 = '/evaluacion'
		buttonMensaje2 ='Crear nuevo contrato'
		redirectDir2=`/contrato/crear/${id_proveedor}`



		return (
			<>
				<div className="content-wrapper">
					<div className="center">
						<h6> {mensaje} </h6>
					</div>
						<div className="center">
						
						<Button 
							className="button-one"
							variant="outlined" 
							color="primary"
							size="small" 
							onClick={ e => handleSubmit(redirectDir1)}
						>
							{buttonMensaje1}
							
						</Button>
						<Button 
							className="button-one"
							variant="outlined" 
							color="primary"
							size="small" 
							onClick={handleRenovarContrato}
						>
							{buttonMensaje}
							
						</Button>
						<Button 
							variant="outlined" 
							color="primary"
							size="small" 
							onClick={ e => handleSubmit(redirectDir2)}
						>
							{buttonMensaje2}
							
						</Button>
					</div>
				</div>
			</>

		)
	}
}

export default MostrarResultado