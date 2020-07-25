import React, {useState,useEffect} from 'react';
import {Divider, TextField, Input} from '@material-ui/core/';
import {Table, Button} from "tabler-react";
import Criterio from './Criterio/Criterio';
import './llenar-criterios.css';
import { useHistory } from "react-router-dom";



const DummyCriterios =  [
	{
	   id_eval_crit:2,	
	   id_criterio_evaluacion:2,
	   tipo_criterio_evaluacion:'normal',
	   peso_prctj_eval_crit:20,
	   descripcion_criterio_evaluacion:'Ubicación Servicio',

	},
	{
	   id_eval_crit:3,	
	   id_criterio_evaluacion:3,
	   tipo_criterio_evaluacion:'normal',
	   peso_prctj_eval_crit:10,
	   descripcion_criterio_evaluacion:'Servicio',

	},

	{
       id_eval_crit:4,	
	   id_criterio_evaluacion:4,
	   tipo_criterio_evaluacion:'normal',
	   peso_prctj_eval_crit:50,
	   descripcion_criterio_evaluacion:'Otro criterio',
	},

]

const DummyEscala = {
    min_escala: '0',
    max_escala: '10',
}


//////////NO BORRAR
//les agrega el valor calificacion




const LlenarCriterios = (props) => {

	const [criterioExito, setCriterioExito] = useState({
	   id_eval_crit:1,	
	   id_criterio_evaluacion:1,
	   tipo_criterio_evaluacion:'exito',
	   peso_prctj_eval_crit:10,	   
	   descripcion_criterio_evaluacion:'Criterio Exito'
	})

	const procesarEvaCrit = (crits) => {		
		crits.forEach(crit => {
			crit.calificacion=''
		});
		return crits
	}

	const id_productor = localStorage.getItem('id_productor');
	const id_proveedor = props.match.params.idproveedor
	const tipo_evaluacion = props.match.params.tipoeval
	const id_contrato = props.match.params.idcontrato
	const [evaCrits, setEvaCrits] = useState(procesarEvaCrit(DummyCriterios))
	const [escala, setEscala] = useState(DummyEscala)
	const [result, setResult] = useState('')
	const history = useHistory();

	const calificar = () => {
		
		let nota_aprobatoria = criterioExito
		let nota_acumulada =0
		let copyEvaCrits = [...evaCrits]
		
		copyEvaCrits.forEach( crit => {
			nota_acumulada = nota_acumulada + (crit.peso_prctj_eval_crit/100) * crit.calificacion
		})

		return [nota_acumulada, nota_acumulada>=nota_aprobatoria]

	}


	const handleSubmit = () => {
		let [calificacion,status] = calificar()
		history.replace(`/realizar-evaluacion/resultados-eval/${tipo_evaluacion}/${calificacion}/${status}/${id_proveedor}/${id_contrato}`)
	
	}

	const handleChangeCriterio = (indice,e) => {
		let copyEvaCrits = [...evaCrits]
		copyEvaCrits[indice]= {...copyEvaCrits[indice], calificacion: e.target.value} 
		setEvaCrits(copyEvaCrits)
	}



	
	if(escala && evaCrits){

	return (

		<>
			{console.log('EvaCrits',evaCrits)}
			{console.log('Escala', escala)}
			<div className="llenar-criterios-wrapper" >
				<div>
					<div className="center">
			    		<h3 className="llenar-criterios-titulo"> Realizar Evaluación {tipo_evaluacion==='inicial'? 'Inicial':'de Renovación'}</h3>
			    	</div>

					<Divider />

					<div className="center">
						<h4 className="llenar-criterios-subtitle"> Escala </h4>
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