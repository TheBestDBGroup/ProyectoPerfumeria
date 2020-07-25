import React from 'react'
import {Divider, TextField, Input} from '@material-ui/core/';
import './criterio.css'
const Criterio = ({handleChangeCriterio,criterio,indice}) => {
	return (
			<>
				<div className="criterio-wrapper">
					<div className="criterio-title-wrapper">
					<h5 className="criterio-title"> Criterio {criterio.tipo_criterio_evaluacion} </h5>
					<p> Peso: {criterio.peso_prctj_eval_crit}% </p>
					</div>
					<p className="criterio-subtitle"> Descripción </p>
					<p> {criterio.descripcion_criterio_evaluacion} </p>
					<div className="calificacion-wrapper">
						<p className="criterio-subtitle calificacion-subtitle"> Calificación </p>
						<TextField
							value={criterio.calificacion}
							onChange={ e => handleChangeCriterio(indice,e)}
						/> 
					</div>
				</div>
			</>

	)
}

export default Criterio