import React,{useState} from 'react';
import {Divider, TextField, Button} from '@material-ui/core/';
import Criterio from './Criterio/Criterio'
import InfoProdSubheader from '../../../components/InfoProdSubheader/InfoProdSubheader'
import './crear-evaluacion-styles.css'


//TODO: Cambiar criterios 

const DummyCriterios =  [
	{
	   id_criterio_evaluacion:1,
	   tipo_criterio_evaluacion:'exito',	   
	   descripcion_criterio_evaluacion:'Criterio de éxito'
	},
	{
	   id_criterio_evaluacion:2,
	   tipo_criterio_evaluacion:'normal',
	   descripcion_criterio_evaluacion:'Ubicación del Proveedor',

	},
	{
	   id_criterio_evaluacion:3,
	   tipo_criterio_evaluacion:'normal',
	   descripcion_criterio_evaluacion:'Costo',

	},
	{
	   id_criterio_evaluacion:4,
	   tipo_criterio_evaluacion:'normal',
	   descripcion_criterio_evaluacion:'Alternativas de Envío',
	},

]

//no borrar

const initEscala = {
	min_escala:'',
    max_escala:'',
}

const CrearEvaluacion = (props) => {

	const [criterioExito, setCriterioExito] = useState({})
	const [criterios,setCriterios] = useState([])
	const [opcionesCriterios, setOpcionesCriterios] = useState(DummyCriterios)
	const [escala,setEscala] = useState(initEscala)
	const tipo = props.match.params.tipo //inicial o de renovacion
	const productorId = localStorage.getItem('id_productor');

	//MANEJAR ENVIOS

	const agregarCriterio = () => {
		let criteriosCopy = [...criterios]
		criteriosCopy.push({id:'',peso_prctj_eval_crit:''})
		setCriterios(criteriosCopy)
	}

	const borrarCriterio = (indice) => {
		let criteriosCopy = [...criterios]
		criteriosCopy.splice(indice,1)
		setCriterios(criteriosCopy) 
	}

	const handleChangeCriterio = (indice,e) => {
		let criteriosCopy = [...criterios]
		let peso = criteriosCopy[indice].peso_prctj_eval_crit
		criteriosCopy[indice] = opcionesCriterios[e.target.value]
		criteriosCopy[indice].peso_prctj_eval_crit = peso
		setCriterios(criteriosCopy)
	}

	const handleChangeCritExito = (e) => {
		setCriterioExito({...criterioExito,peso_prctj_eval_crit: e.target.value})
	}

	const handlePesoCriterio =(indice, e) => {
		let criteriosCopy =[...criterios]
		criteriosCopy[indice].peso_prctj_eval_crit = e.target.value
		setCriterios(criteriosCopy)
	}

	const handleSubmit=() => {
		console.log('criterios',criterios)
	}

	const handleChangeEscala = e => {

    	setEscala({ ...escala, [e.target.name]: e.target.value})
  	}



	return (
		<>
			<InfoProdSubheader redirectDir={`crear-evaluacion/${tipo}`}/>
			{console.log('criterios',criterios)}
			{console.log('escala',escala)}
				
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
							<TextField label="Puntaje Mínimo" variant="outlined" name="min_escala" value={escala.min_escala} onChange={handleChangeEscala}/>
						</div>
						<div className="escala-eval-label">
							<h6> Puntaje Máximo </h6>
							<TextField label="Puntaje Máximo" variant="outlined" name="max_escala" value={escala.max_escala} onChange={handleChangeEscala}/>
						</div>
					</div>

					<Divider variant="middle" />

					<div className="center-title">
						<div className="criterio-exito">
							<h4>Criterio de Éxito </h4>
							<TextField label="Nota mínima aprobatoria" variant="outlined" name="criterio_exito" value={criterioExito.peso_prctj_eval_crit} onChange={(e) => handleChangeCritExito(e)}/>
						</div>	
					</div>


					
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