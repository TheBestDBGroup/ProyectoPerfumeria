import React, {useState} from 'react';
import './filtro-productor-styles.css';
import {Table, Button} from "tabler-react";
import { useHistory } from "react-router-dom";


//Aqui se elige el productor con quien trabajar
//sessionStorage.setItem('nombre', response.data.user.nombre);

const DummyProductores = [
	{ 
		id_productor: 1,
		nombre_productor:'Productor El perfumista',
		web_productor: 'www.proveedor.com',
		email_productor: 'proveedor@gmail.com'
	},
	{ 
		id_productor: 2,
		nombre_productor:'Proveedor Perfumito 3000',
		web_productor: 'www.proveedor.com',
		email_productor: 'proveedor@gmail.com'
	},
	{ 
		id_productor: 3,
		nombre_productor:'Proveedor Perfumito 3000',
		web_productor: 'www.proveedor.com',
		email_productor: 'proveedor@gmail.com'
	},
	{ 
		id_productor: 4,
		nombre_productor:'Proveedor Perfumito 3000',
		web_productor: 'www.proveedor.com',
		email_productor: 'proveedor@gmail.com'
	},
]


const FiltroProductor = (props) => {

	const history = useHistory();

	//esto se cambiara a estado cuando se conecte al server
	const productores = DummyProductores

	const redirectDir = props.match.params.redirectDir
	const handleSelect = (id) => {
		localStorage.setItem('id_productor', id);
		history.push(`/${redirectDir}`);
	}



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
}


export default FiltroProductor