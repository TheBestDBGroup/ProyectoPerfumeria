import React, {useState,useEffect} from 'react';
import {Divider, TextField, Input} from '@material-ui/core/';
import {Table, Button} from "tabler-react";
import Criterio from './Criterio/Criterio';
import './llenar-criterios.css';
import { useHistory } from "react-router-dom";



const DummyCriterios =  [
	{
	   id_eval_crit:1,	
	   id_criterio_evaluacion:1,
	   tipo_criterio_evaluacion:'es bonitico',
	   peso_prctj_eval_crit:20,	   
	   descripcion_criterio_evaluacion:'bonitico Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem eros, interdum eget justo non, pretium semper eros. Ut eget nisl a leo commodo laoreet',

	},
	{
	   id_eval_crit:2,	
	   id_criterio_evaluacion:2,
	   tipo_criterio_evaluacion:'es eficiente',
	   peso_prctj_eval_crit:20,
	   descripcion_criterio_evaluacion:'eficiente Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem eros, interdum eget justo non, pretium semper eros. Ut eget nisl a leo commodo laoreet',

	},
	{
	   id_eval_crit:3,	
	   id_criterio_evaluacion:3,
	   tipo_criterio_evaluacion:'es rapido',
	   peso_prctj_eval_crit:10,
	   descripcion_criterio_evaluacion:'rapido Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem eros, interdum eget justo non, pretium semper eros. Ut eget nisl a leo commodo laoreet',

	},

	{
       id_eval_crit:4,	
	   id_criterio_evaluacion:4,
	   tipo_criterio_evaluacion:'esta cool',
	   peso_prctj_eval_crit:50,
	   descripcion_criterio_evaluacion:'cool Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem eros, interdum eget justo non, pretium semper eros. Ut eget nisl a leo commodo laoreet',
	},

]

const DummyEscala = {
    min_escala: '0',
    max_escala: '10',
    criterio_exito:'50',
}


//////////NO BORRAR
//les agrega el valor calificacion
	const procesarEvaCrit = (crits) => {
		crits.forEach(crit => {
			crit.calificacion=''
		});
		return crits
	}



const LlenarCriterios = (props) => {

	const id_productor = localStorage.getItem('id_productor');
	const id_proveedor = props.match.params.idproveedor
	const tipo_evaluacion = props.match.params.tipoeval
	const [evaCrits, setEvaCrits] = useState(procesarEvaCrit(DummyCriterios))
	const [escala, setEscala] = useState(DummyEscala)
	const [result, setResult] = useState('')
	const history = useHistory();

	const calificar = () => {
		
		let nota_aprobatoria = escala.max_escala * (escala.criterio_exito/100)
		let nota_acumulada =0
		let copyEvaCrits = [...evaCrits]
		
		copyEvaCrits.forEach( crit => {
			nota_acumulada = nota_acumulada + (crit.peso_prctj_eval_crit/100) * crit.calificacion
		})

		return [nota_acumulada, nota_acumulada>=nota_aprobatoria]

	}


	const handleSubmit = () => {
		//Calificar
		let [calificacion,status] = calificar()
		history.replace(`/realizar-evaluacion/resultados-eval/${tipo_evaluacion}/${calificacion}/${status}/${id_proveedor}`)
	
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
							<h6> Porcentaje requerido para aprobar: </h6>
							<p> {escala.criterio_exito}% </p>
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