import React from 'react';
import './info-prod-subheader-styles.css'
import {Nav,Button} from "tabler-react";
import { useHistory } from "react-router-dom";

//Muestra la informacion del prod que se ha elegido
	

const InfoProdSubheader = ({redirectDir}) => {

	const productorId = localStorage.getItem('id_productor');
	const history = useHistory();


	const handleChangeProd = () => {
		history.push(`/elegirProd/${redirectDir}`);
	}
	
	return (
	
	<Nav className="subheader-nav" style={ {backgroundColor:'white'}}>	
			<p className="subheader-info"> Productor ID = {productorId} </p>
			<Button onClick={handleChangeProd} 
					color="primary" 
					className="subheader-button"
			>
					Elegir otro productor
			</Button>
	</Nav>

	)
}

export default InfoProdSubheader