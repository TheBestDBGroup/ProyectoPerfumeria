import React,{useState} from 'react';
import {Divider, TextField, Button} from '@material-ui/core/';
import InfoProdSubheader from '../../../components/InfoProdSubheader/InfoProdSubheader'
import './cancelar-contrato.css'
import { useHistory } from "react-router-dom";
import axios from 'axios'



const CancelarContrato = (props) => {

	const id_contrato = props.match.params.idContrato
	const [motivo, setMotivo] = useState('')
	const history = useHistory();

	const handleChangeMotivo = (e) => {
		setMotivo(e.target.value)
	}

	const handleSubmit = () => {
		axios.post('/update/cancelar-contrato', {
		    id_contrato: id_contrato,
		    motivo_cancela: motivo
		  })
		  .then((res) =>{
		  	alert('Contrato cancelado con éxito')
		    history.push(`/`);
            
		  })
		  .catch(function (error) {
		    console.log(error);
		 });
		
	}

	return (
		<>
			<div className="center">
				<h4 className="main-title"> Cancelar Contrato </h4>
			</div> 

			<Divider/>

			<div className="center">
				<div className="textfield"> 		
					<TextField label="Motivo Cancelación" 
						variant="outlined" 
						multiline
						rows={5} 
						style={{width:600}}
						value={motivo} 
						onChange={e => handleChangeMotivo(e)}
					/>
				</div>
			</div>


			<div className="center">
				<div className="button-wrapper">
					<Button 
						color="primary"
						variant="outlined" 
						onClick={handleSubmit}
					>
						Cancelar contrato
					</Button>
				</div>
			</div>

		</>

	)
}

export default CancelarContrato