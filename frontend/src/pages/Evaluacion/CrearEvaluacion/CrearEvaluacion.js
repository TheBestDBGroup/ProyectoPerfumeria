import React,{useState} from 'react';
import {Divider, TextField, Button} from '@material-ui/core/';
import Criterio from './Criterio/Criterio'
import InfoProdSubheader from '../../../components/InfoProdSubheader/InfoProdSubheader'
import './crear-evaluacion-styles.css'
const DummyCriterios =  [
	{
	   id_criterio_evaluacion:1,
	   tipo_criterio_evaluacion:'inicial',
	   descripcion_criterio_evaluacion:'es bonitico',
	},
	{
	   id_criterio_evaluacion:2,
	   tipo_criterio_evaluacion:'inicial',
	   descripcion_criterio_evaluacion:'es eficiente',
	},
	{
	   id_criterio_evaluacion:3,
	   tipo_criterio_evaluacion:'renovacion',
	   descripcion_criterio_evaluacion:'es rapido',
	},
	{
	   id_criterio_evaluacion:4,
	   tipo_criterio_evaluacion:'renovacion',
	   descripcion_criterio_evaluacion:'esta cool',
	},

]

const CrearEvaluacion = (props) => {

	const [criterios,setCriterios] = useState([])
	const [opcionesCriterios, setOpcionesCriterios] = useState(DummyCriterios)
	const tipo = props.match.params.tipo //inicial o de renovacion
	const productorId = localStorage.getItem('id_productor');

	//MANEJAR ENVIOS

	const agregarCriterio = () => {
		let criteriosCopy = [...criterios]
		criteriosCopy.push({id:'',peso_prctj__eval_crit:''})
		setCriterios(criteriosCopy)
	}

	const borrarCriterio = (indice) => {
		let criteriosCopy = [...criterios]
		criteriosCopy.splice(indice,1)
		setCriterios(criteriosCopy) 
	}

	const handleChangeCriterio = (indice,e) => {
		console.log('criterios e',e.target.value)
		console.log('criterios handle change pre',criterios)
		console.log('criterio')
		let criteriosCopy = [...criterios]
		let peso = criteriosCopy[indice].peso_prctj__eval_crit
		console.log('criterios peso',peso)
		criteriosCopy[indice] = opcionesCriterios[e.target.value]
		console.log('opcionesCriterios')
		criteriosCopy[indice].peso_prctj__eval_crit = peso
		setCriterios(criteriosCopy)
		
	}

	const handlePesoCriterio =(indice, e) => {
		console.log('criterios handle peso pre',criterios)
		console.log('indice', indice)
		let criteriosCopy =[...criterios]
		criteriosCopy[indice].peso_prctj__eval_crit = e.target.value
		setCriterios(criteriosCopy)
		console.log('criterios handle peso post',criterios)
	}

	const handleSubmit=() => {
		console.log('criterios',criterios)
	}


	return (
		<>
			<InfoProdSubheader redirectDir={`crear-evaluacion/${tipo}`}/>
				
			<div className="center-everything">
				<div className="crear-evaluacion-wrapper">
					<div className="center-title">
						<h3> Crear Formula de Evaluación</h3>
					</div>
					<div className="center-title">
						<h4> Tipo = {tipo=='inicial'?'Inicial':'Renovación'}</h4>
					</div>

					<Divider />
					<div className="center-title">
					<h4 className="escala-evaluacion-title">Escala de Evaluación</h4>
					</div>
					<div className="escala-eval-content-wrapper">
						<div className="escala-eval-label">
							<h6> Puntaje Mínimo</h6>
							<TextField label="Puntaje Mínimo" variant="outlined" />
						</div>
						<div className="escala-eval-label">
							<h6> Puntaje Máximo </h6>
							<TextField label="Puntaje Máximo" variant="outlined" />
						</div>
					</div>
					<div className="center-title">
						<div className="criterio-exito">
							<h4>Criterio de Éxito </h4>
							<TextField label="% mínimo" variant="outlined" />
						</div>	
					</div>


					<Divider variant="middle" />
					<div className="center-title">
						<div className="criterios-eval-wrapper">
							<div className="center-title">
								<h4 className="crit-eval-title">Criterios de Evaluación </h4>
							</div>
							<Button variant="outlined" size="small" onClick={agregarCriterio}>
							  + Nuevo
							</Button>


							{criterios.map((criterio,indice) => (
								<Criterio
									key={indice} 
									indice={indice}
									handleChange={handleChangeCriterio} 
									criterios={criterios} 
									opciones={opcionesCriterios}
									handleDelete={borrarCriterio}
									handlePesoCriterio={handlePesoCriterio}
								/>
							))}

							<div className="center-title">
								<Button variant="outlined" size="small" className="crit-eval-submit-button" onClick={handleSubmit}>
								  Crear fórmula de evaluación
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>


		</>

	)
}

export default CrearEvaluacion