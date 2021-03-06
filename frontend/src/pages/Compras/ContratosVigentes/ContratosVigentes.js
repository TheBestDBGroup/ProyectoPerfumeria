import React, {useState,useEffect} from 'react';
import './contratos-vigentes.css';
import InfoProdSubheader from '../../../components/InfoProdSubheader/InfoProdSubheader'
import {Table, Button} from "tabler-react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Redirect } from 'react-router-dom'


//Mostrar lista de proveedores 
const RealizarEvaluacionRenovacion = () => {

	const productorId = localStorage.getItem('id_productor');
	const history = useHistory();
	const [proveedores,setProveedores] = useState(undefined)


	const convertISODate = (ISODate) => {
		
		let date = new Date(ISODate);
		let year = date.getFullYear();
		let month = date.getMonth()+1;
		let dt = date.getDate();

		if (dt < 10) {
		  dt = '0' + dt;
		}
		if (month < 10) {
		  month = '0' + month;
		}

		let dateStr = `${dt}/${month}/${year}`

		return dateStr
	}

	useEffect(() => {
        axios.post('/read/proveedores-con-contratos-vigentes', {
		    id_productor: productorId,
		  })
		  .then((res) =>{
		    console.log('response contratos vigentes', res.data);
            setProveedores(res.data);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	     
	}, []);



  	const handleSelect = (id, idcontrato) => {
		history.push(`/comprar/detalles-contrato/${idcontrato}/${id}`);
	}

	if(!productorId) {
		return <Redirect to="/elegirProd/compras" />

	}



	if(proveedores){
	return (
		<>
		<InfoProdSubheader redirectDir={'compras'}/>
		<div className="center">
			<h1 className="evaluacion-inicial-titulo"> Seleccione el proveedor al cual desea comprar  </h1>
		</div>

		
		<Table>

			  <Table.Header>
			    <Table.ColHeader>ID</Table.ColHeader>
			    <Table.ColHeader>Nombre</Table.ColHeader>
			    <Table.ColHeader>Web</Table.ColHeader>
			    <Table.ColHeader>Email</Table.ColHeader>
			    <Table.ColHeader>ID Contrato</Table.ColHeader>
			     <Table.ColHeader>Fecha Emisión</Table.ColHeader>
			    <Table.ColHeader>Acción</Table.ColHeader>
			  </Table.Header>

			  <Table.Body>
			  { proveedores.map( proveedor => (
			    <Table.Row>
			     	<Table.Col>{proveedor.id_proveedor} </Table.Col>
			    	<Table.Col>{proveedor.nombre_proveedor}</Table.Col>
			    	<Table.Col>{proveedor.web_proveedor} </Table.Col>
			     	<Table.Col>{proveedor.email_proveedor} </Table.Col>
			     	<Table.Col>{proveedor.id_contrato} </Table.Col>
			     	<Table.Col>{convertISODate(proveedor.fecha_emision_contrato)} </Table.Col>	
			    	<Table.Col>
			        	<Button onClick={() => handleSelect(proveedor.id_proveedor, proveedor.id_contrato)} color="primary" className="eval-ren-buttons">Realizar Compra</Button>
			      	</Table.Col>
			    </Table.Row>
			   ))}

			  </Table.Body>
		</Table>
		</>

	);
	} else {
		return <p> Cargando... </p>
	}
}


export default RealizarEvaluacionRenovacion