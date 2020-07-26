import React,{useState, useEffect} from 'react';
import {Divider, TextField, Button} from '@material-ui/core/';
import Criterio from './Criterio/Criterio'
import InfoProdSubheader from '../../../components/InfoProdSubheader/InfoProdSubheader'
import './crear-evaluacion-styles.css'
import axios from 'axios'
import { useHistory } from "react-router-dom";




const initEscala = {
	min_escala:'',
    max_escala:'',
}

const CrearEvaluacion = (props) => {

	const [criterioExito, setCriterioExito] = useState(undefined)
	const [criterios,setCriterios] = useState([])
	const [opcionesCriterios, setOpcionesCriterios] = useState(undefined)
	const [escala,setEscala] = useState(initEscala)
	const tipo = props.match.params.tipo ==='Inicial'? 'Inicial':'Renovación'
	const productorId = localStorage.getItem('id_productor');
	const history = useHistory();

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
		setCriterioExito({...criterioExito, peso_prctj_eval_crit:e.target.value})
	}

	const handlePesoCriterio =(indice, e) => {
		let criteriosCopy =[...criterios]
		criteriosCopy[indice].peso_prctj_eval_crit = e.target.value
		setCriterios(criteriosCopy)
	}

	const handleSubmit=() => {
		let promesas = []
		
		promesas.push(		
			axios.post('/create/finalizar-eval-crits', {
		    	id_productor: productorId, 
		    	tipo_eval_crit: tipo,
	  		})
		)


		//enviando criterios
		criterios.forEach(crit => 

		promesas.push(		
				axios.post('/create/eval-crit', {
			    	id_productor: productorId, 
			    	peso: crit.peso_prctj_eval_crit,
			    	tipo_eval_crit: tipo,
			    	id_criterio_eval:crit.id_criterio_eval,
		  		})
			)
		
		);

		//enviando criterio de exito
		promesas.push(
				axios.post('/create/eval-crit', {
			    	id_productor: productorId, 
			    	peso: criterioExito.peso_prctj_eval_crit,
			    	tipo_eval_crit: tipo,
			    	id_criterio_eval:criterioExito.id_criterio_eval,
		  		})
		 )

		if(escala.min_escala !== '' || escala.max_escala !== ''){		
			promesas.push(
				axios.post('/create/escala', {
				    	id_productor: productorId, 
				    	min: escala.min_escala,
				    	max: escala.max_escala,
			  		})
			)
		}

		Promise.all(promesas)
		 .then(function (res) {
		    console.log('response promise all', res)
		    alert('Evaluación creada con exito')
		    history.push(`/`);
		  });

	}

	const handleChangeEscala = e => {
    	setEscala({ ...escala, [e.target.name]: e.target.value})
  	}

  	const filterCriterioExito = (crits) =>{
  		let critsCopy = [...crits]
  		critsCopy = critsCopy.filter(item => item.tipo_criterio_eval === 'normal')
  		return critsCopy
  	}

  	const getCriterioExito = (crits) => {
  		let critsCopy = [...crits]
  		critsCopy = critsCopy.filter(item => item.tipo_criterio_eval === 'exito')
  		critsCopy = {id_criterio_eval: critsCopy[0].id_criterio_eval, peso_prctj_eval_crit:''}
  		return critsCopy
  	}

  	useEffect(() => {
        axios.post('/read/criterios-evaluacion', {})
		  .then((res) =>{
		    console.log('response criterios de evaluacion', res.data);
		    setOpcionesCriterios(filterCriterioExito(res.data));
            setCriterioExito(getCriterioExito(res.data))
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	     
	}, []);


  	if(opcionesCriterios && criterioExito){
	return (
		<>
			<InfoProdSubheader redirectDir={`evaluacion`}/>
			{console.log('est criterios',criterios)}
			{console.log('est escala',escala)}
			{console.log('est criterio exito', criterioExito)}
			{console.log('est opcionesCriterios', opcionesCriterios)}
			{console.log('tipo', tipo)}
				
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
							<TextField label="% Mínimo Aprobatorio" variant="outlined" name="criterio_exito" value={criterioExito.peso_prctj_eval_crit} onChange={(e) => handleChangeCritExito(e)}/>
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
	} else {
		return <>Cargando... </>
	}
}

export default CrearEvaluacion