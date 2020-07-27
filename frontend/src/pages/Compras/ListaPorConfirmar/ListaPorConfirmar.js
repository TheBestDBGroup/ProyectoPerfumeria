import React, {useState,useEffect} from 'react';
import './lista-por-confirmar.css';
import InfoProveeSubheader from '../../../components/InfoProveeSubheader/InfoProveeSubheader'
import {Table, Button} from "tabler-react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Redirect } from 'react-router-dom'

const DummyPedidos = [
{	

	id_productor:1,
	nombre_productor:'Mario',
	id_pedido:1,
	fecha_pedido:'2011-10-05T14:48:00.000Z',
	monto_pedido:234,
},
{	

	id_productor:2,
	nombre_productor:'Yorfrank',
	id_pedido:2,
	fecha_pedido:'2011-10-05T14:48:00.000Z',
	monto_pedido:234,
},
{	

	id_productor:2,
	nombre_productor:'Yorfrank',
	id_pedido:2,
	fecha_pedido:'2011-10-05T14:48:00.000Z',
	monto_pedido:234,
},
]
//Mostrar lista de proveedores 
const ListaPedidos = () => {

	const proveedorId = localStorage.getItem('id_proveedor');
	const history = useHistory();
	const [pedidos,setPedidos] = useState(DummyPedidos)


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

	const handleRejectPedido = (id_pedido) => {

	}

	const handleAceptPedido = (id_pedido) => {
		
	}

	useEffect(() => {
		/*
        axios.post('/read/proveedores-con-contratos-vigentes', {
		    id_productor: productorId,
		  })
		  .then((res) =>{
		    console.log('response contratos vigentes', res.data);
            setProveedores(res.data);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });*/
	     
	}, []);





	if(!proveedorId) {
		return <Redirect to="/elegirProv/compras" />
	}



	if(pedidos){
	return (
		<>
		<InfoProveeSubheader redirectDir={'compras'}/>
		<div className="center">
			<h1 className="evaluacion-inicial-titulo"> Listado de Pedidos Por Confirmar </h1>
		</div>

		
		<Table>

			  <Table.Header>
			  	<Table.ColHeader>ID Productor</Table.ColHeader>
			  	<Table.ColHeader>Nombre Productor</Table.ColHeader>
			    <Table.ColHeader>ID Pedido</Table.ColHeader>
			    <Table.ColHeader>Fecha Pedido</Table.ColHeader>
			    <Table.ColHeader>Monto Pedido</Table.ColHeader>	
			    <Table.ColHeader> Acciones </Table.ColHeader>   
			  </Table.Header>

			  <Table.Body>
			  { pedidos.map( pedido => (
			    <Table.Row>
			     	<Table.Col>{pedido.id_productor} </Table.Col>
			    	<Table.Col>{pedido.nombre_productor}</Table.Col>
			    	<Table.Col>{pedido.id_pedido} </Table.Col>
			     	<Table.Col>{convertISODate(pedido.fecha_pedido)} </Table.Col>
			     	<Table.Col>{pedido.monto_pedido}$ </Table.Col>
			     	<Table.Col>
			     			<Button 
				        		onClick={() => handleRejectPedido(pedido.id_pedido)} 
				        		color="danger" 
				        		className="eval-ren-buttons"
			        		>
			        			Rechazar
			        		</Button>
			        		<Button 
				        		onClick={() => handleAceptPedido(pedido.id_pedido)} 
				        		color="primary" 
				        		className="eval-ren-buttons"
			        		>
			        			Aceptar 
			        		</Button>

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


export default ListaPedidos