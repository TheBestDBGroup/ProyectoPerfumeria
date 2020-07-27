import React, {useState,useEffect} from 'react';
import './filtro-proveedor-styles.css';
import {Table, Button} from "tabler-react";
import { useHistory } from "react-router-dom";
import axios from 'axios';


const FiltroProveedor = (props) => {

	const history = useHistory();

	const [proveedores,setProveedores] = useState(undefined) //estado cuando se conecte al server
	const redirectDir = props.match.params.redirectDir

	const handleSelect = (id) => {
		localStorage.setItem('id_proveedor', id);
		history.push(`/${redirectDir}`);
	}

	useEffect(() => {
	       axios.post(`/read/proveedores`)
	            .then((res) => {
	                 console.log('response /read/proveedores', res.data);
	                 setProveedores(res.data);
	            }, (error) => {
	                console.log(error);
	        });
	     
	}, []);



if(proveedores){
return (
	<>
		<h1 className="filtro-productor-titulo"> Seleccione el proveedor que desea gestionar </h1>

		<Table>

			  <Table.Header>
			  {console.log('redirectDir',redirectDir)}
			    <Table.ColHeader>ID</Table.ColHeader>
			    <Table.ColHeader>Nombre</Table.ColHeader>
			    <Table.ColHeader>Web</Table.ColHeader>
			    <Table.ColHeader>Email</Table.ColHeader>
			    <Table.ColHeader>Acción</Table.ColHeader>
			  </Table.Header>

			  <Table.Body>
			  { proveedores.map( proveedor => (
			    <Table.Row>
			     	<Table.Col>{proveedor.id_proveedor} </Table.Col>
			    	<Table.Col>{proveedor.nombre_proveedor}</Table.Col>
			    	<Table.Col>{proveedor.web_proveedor} </Table.Col>
			     	<Table.Col>{proveedor.email_proveedor} </Table.Col>
			    	<Table.Col>
			        	<Button onClick={() => handleSelect(proveedor.id_proveedor)} color="primary">Seleccionar</Button>
			      	</Table.Col>
			    </Table.Row>
			   ))}

			  </Table.Body>
		</Table>
	</>
	)
} else {
		return <p> Cargando... </p>
}

}


export default FiltroProveedor