import React from 'react';
import './info-provee-subheader-styles.css'
import {Nav,Button} from "tabler-react";
import { useHistory } from "react-router-dom";

//Muestra la informacion del prod que se ha elegido
	

const InfoProveeSubheader = ({redirectDir}) => {

	const proveedorId = localStorage.getItem('id_proveedor');
	const history = useHistory();


	const handleChangeProv = () => {
		history.push(`/elegirProv/${redirectDir}`);
	}
	
	return (
	
	<Nav className="subheader-nav" style={ {backgroundColor:'white'}}>	
			<p className="subheader-info"> Proveedor ID = {proveedorId} </p>
			<Button onClick={handleChangeProv} 
					color="primary" 
					className="subheader-button"
			>
					Elegir otro proveedor
			</Button>
	</Nav>

	)
}

export default InfoProveeSubheader