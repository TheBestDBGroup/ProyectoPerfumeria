import React, {useState,useEffect} from 'react';
import './lista-pedidos.css';
import InfoProdSubheader from '../../../components/InfoProdSubheader/InfoProdSubheader'
import {Table, Button} from "tabler-react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Redirect } from 'react-router-dom'

const DummyPedidos = [
{	

	id_proveedor:1,
	nombre_proveedor:'Mario',
	id_pedido:1,
	fecha_pedido:'2011-10-05T14:48:00.000Z',
	monto_pedido:234,
	estatus_pedido:'Confirmado',
	fecha_confirmacion_pedido:'2011-10-05T14:48:00.000Z',
	num_factura_pedido:3,
},
{	

	id_proveedor:2,
	nombre_proveedor:'Javier',
	id_pedido:5,
	fecha_pedido:'2011-10-05T14:48:00.000Z',
	monto_pedido:567,
	estatus_pedido:'Por Confirmar',
},
{
	id_proveedor:3,
	nombre_proveedor:'Maria',
	id_pedido:9,
	fecha_pedido:'2011-10-05T14:48:00.000Z',
	monto_pedido:890,
	estatus_pedido:'Confirmado',
	fecha_confirmacion_pedido:'2011-10-05T14:48:00.000Z',
	num_factura_pedido:7,
},
]
//Mostrar lista de proveedores 
const ListaPedidos = () => {

	const productorId = localStorage.getItem('id_productor');
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



  	const handleSelect = (idpedido) => {
		history.push(`/ver-pagos/${idpedido}`);
	}

	if(!productorId) {
		return <Redirect to="/elegirProd/compras" />

	}



	if(pedidos){
	return (
		<>
		<InfoProdSubheader redirectDir={'compras'}/>
		<div className="center">
			<h1 className="evaluacion-inicial-titulo"> Listado de Pedidos  </h1>
		</div>

		
		<Table>

			  <Table.Header>
			  	<Table.ColHeader>ID Proveedor</Table.ColHeader>
			  	<Table.ColHeader>Nombre Proveedor</Table.ColHeader>
			    <Table.ColHeader>ID Pedido</Table.ColHeader>
			    <Table.ColHeader>Fecha</Table.ColHeader>
			    <Table.ColHeader>Monto</Table.ColHeader>
			    <Table.ColHeader>Estatus</Table.ColHeader>
			    <Table.ColHeader>Fecha Confirmación</Table.ColHeader>
			    <Table.ColHeader>Número de Factura</Table.ColHeader>
			    <Table.ColHeader>Acciones</Table.ColHeader>
			   
			  </Table.Header>

			  <Table.Body>
			  { pedidos.map( pedido => (
			    <Table.Row>
			     	<Table.Col>{pedido.id_proveedor} </Table.Col>
			    	<Table.Col>{pedido.nombre_proveedor}</Table.Col>
			    	<Table.Col>{pedido.id_pedido} </Table.Col>
			     	<Table.Col>{convertISODate(pedido.fecha_pedido)} </Table.Col>
			     	<Table.Col>{pedido.monto_pedido} $ </Table.Col>
			     	<Table.Col>{pedido.estatus_pedido} </Table.Col>	
			     	{pedido.estatus_pedido === 'Por Confirmar'?
			     	(<> 
			      		<Table.Col> </Table.Col>
			      		<Table.Col> </Table.Col>
			      		<Table.Col> </Table.Col>
			      	 </>):(
			     		<>
			     		<Table.Col>{convertISODate(pedido.fecha_confirmacion_pedido)} </Table.Col>	
			     		<Table.Col>{pedido.num_factura_pedido} </Table.Col>	
			    		<Table.Col>
			        		<Button 
				        		onClick={() => handleSelect(pedido.id_pedido)} 
				        		color="primary" 
				        		className="eval-ren-buttons"
			        		>
			        			Ver pagos
			        		</Button>
			      		</Table.Col>
			      		</>
			      	)}
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