import React, {useState,useEffect} from 'react';
import {Divider, TextField, Input} from '@material-ui/core/';
import {Table, Button} from "tabler-react";
import Criterio from './Criterio/Criterio';
import './llenar-criterios.css';
import { useHistory } from "react-router-dom";
import axios from 'axios'






const LlenarCriterios = (props) => {

	const [criterioExito, setCriterioExito] = useState(undefined)
	const id_productor = localStorage.getItem('id_productor');
	const id_proveedor = props.match.params.idproveedor
	const tipo_evaluacion = props.match.params.tipoeval
	const tipo = tipo_evaluacion==='inicial'?'Inicial':'Renovación'
	const id_contrato = props.match.params.idcontrato
	const [evaCrits, setEvaCrits] = useState(undefined)
	const [escala, setEscala] = useState(undefined)
	const [result, setResult] = useState('')
	const history = useHistory();

	const calificar = () => {		
		let nota_aprobatoria = criterioExito.peso_prctj_eval_crit
		let nota_acumulada =0
		let copyEvaCrits = [...evaCrits]
		
		copyEvaCrits.forEach( crit => {
			nota_acumulada = nota_acumulada + (crit.peso_prctj_eval_crit/100) * crit.calificacion
		})
		return [nota_acumulada, nota_acumulada>=nota_aprobatoria]
	}

	const handleSubmit = () => {
		let [calificacion,status] = calificar()
		//crear evaluacion en BD
		axios.post('/create/evaluacion', 
			{
				id_productor:id_productor,
				id_proveedor:id_proveedor,
				nota:calificacion,
				tipo:tipo
			})
		  .then((res) =>{
		    console.log('response escala', res.data[0]);
		  	setEscala(res.data[0])
		  })
		  .catch(function (error) {
		    console.log(error);
		  });

		history.replace(`/realizar-evaluacion/resultados-eval/${tipo_evaluacion}/${calificacion}/${status}/${id_proveedor}/${id_contrato}`)
	
	}

	const handleChangeCriterio = (indice,e) => {
		let copyEvaCrits = [...evaCrits]
		copyEvaCrits[indice]= {...copyEvaCrits[indice], calificacion: e.target.value} 
		setEvaCrits(copyEvaCrits)
	}

	const getCriterioExito = (crits) => {
  		let critsCopy = [...crits]
  		critsCopy = critsCopy.filter(item => item.tipo_criterio_eval === 'exito')
  		{console.log('critsCopy',critsCopy)}
  		critsCopy = {peso_prctj_eval_crit:critsCopy[0].peso_prctj_eval_crit}
  		return critsCopy
  	}

  	const procesarEvaCrit = (crits) => {		
		crits.forEach(crit => {
			crit.calificacion=''
		});
		let critsCopy = crits.filter(item => item.tipo_criterio_eval === 'normal')
		return critsCopy
	}

	useEffect(() => {
        
        axios.post('/read/escala', {id_productor:id_productor})
		  .then((res) =>{
		    console.log('response escala', res.data[0]);
		  	setEscala(res.data[0])
		  })
		  .catch(function (error) {
		    console.log(error);
		  });

		 axios.post('/read/eval-crits', {id_productor:id_productor, tipo:tipo})
		  .then((res) =>{
		    console.log('response eval crits', res.data);
		  	setEvaCrits(procesarEvaCrit(res.data))
		  	setCriterioExito(getCriterioExito(res.data))
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	     
	}, []);

	
	if(escala && evaCrits && criterioExito){

	return (

		<>
			{console.log('EvaCrits',evaCrits)}
			{console.log('Escala', escala)}
			{console.log('criterio exito',criterioExito)}
			<div className="llenar-criterios-wrapper" >
				<div>
					<div className="center">
			    		<h3 className="llenar-criterios-titulo"> Realizar Evaluación {tipo_evaluacion==='inicial'? 'Inicial':'de Renovación'}</h3>
			    	</div>

					<Divider />

					<div className="center">
						<h4 className="llenar-criterios-subtitle"> Información de Evaluación </h4>
					</div>
					<div className="llenar-criterios-escala-wrapper">
						<div className="llenar-criterios-escala-inner-wrapper">
							<h6> Puntaje Mínimo: </h6>
							<p> {escala.min_escala} </p>
						</div>

						<div className="llenar-criterios-escala-inner-wrapper">
							<h6> Puntaje Máximo:</h6>
							<p> {escala.max_escala} </p>
						</div>

						<div className="llenar-criterios-escala-inner-wrapper">
							<h6> Nota requerida para aprobar: </h6>
							<p> {criterioExito.peso_prctj_eval_crit} </p>
						</div>
					</div>

					<Divider />
					
					<div className="center">
						<h4 className="llenar-criterios-subtitle"> Calificaciones </h4>
					</div>

					{ evaCrits.map((criterio,indice) => (

						<Criterio
							criterio={criterio}
							indice={indice}
							handleChangeCriterio={handleChangeCriterio}
						/>
						
					))}

					<div className="criterio-button-wrapper">
						<Button onClick={handleSubmit} color="primary" className="criterio-button"> Realizar Evaluación</Button>
					</div>
				</div>
			</div>
		</>
	)
	} else {
		return <> Cargando... </>
	}
}

export default LlenarCriterios