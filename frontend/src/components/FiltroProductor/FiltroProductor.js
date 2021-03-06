import React, {useState,useEffect} from 'react';
import './filtro-productor-styles.css';
import {Table, Button} from "tabler-react";
import { useHistory } from "react-router-dom";
import axios from 'axios';


const FiltroProductor = (props) => {

	const history = useHistory();

	const [productores,setProductores] = useState(undefined) //estado cuando se conecte al server
	const redirectDir = props.match.params.redirectDir

	const handleSelect = (id) => {
		localStorage.setItem('id_productor', id);
		history.push(`/${redirectDir}`);
	}

	useEffect(() => {
	       axios.get(`/read/productores`)
	            .then((res) => {
	                 console.log('response /read/productores', res.data);
	                 setProductores(res.data);
	            }, (error) => {
	                console.log(error);
	        });
	     
	}, []);



if(productores){
return (
	<>
		<h1 className="filtro-productor-titulo"> Seleccione el productor que desea gestionar </h1>

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
			  { productores.map( productor => (
			    <Table.Row>
			     	<Table.Col>{productor.id_productor} </Table.Col>
			    	<Table.Col>{productor.nombre_productor}</Table.Col>
			    	<Table.Col>{productor.web_productor} </Table.Col>
			     	<Table.Col>{productor.email_productor} </Table.Col>
			    	<Table.Col>
			        	<Button onClick={() => handleSelect(productor.id_productor)} color="primary">Seleccionar</Button>
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


export default FiltroProductor