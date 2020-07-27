import React, {useState,useEffect} from 'react';
import './ver-pagos.css';
import {Table} from "tabler-react";
import { useHistory } from "react-router-dom";
import axios from 'axios';


const DummyPagos = [
{	

	id_pago:1,
	id_pedido_pago:2,
	fecha_pago:'2011-10-05T14:48:00.000Z',
	monto_pago:123
},
{	

	id_pago:3,
	id_pedido_pago:4,
	fecha_pago:'2011-10-05T14:48:00.000Z',
	monto_pago:567
},
{	

	id_pago:4,
	id_pedido_pago:5,
	fecha_pago:'2011-10-05T14:48:00.000Z',
	monto_pago:789
},

]
//Mostrar lista de proveedores 
const VerPagos= (props) => {

	const [pagos,setPagos] = useState(DummyPagos)


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


	if(pagos){
	return (
		<>
		<div className="center">
			<h1 className="evaluacion-inicial-titulo"> Listado de Pagos </h1>
		</div>
		<Table>

			  <Table.Header>
			  	<Table.ColHeader>ID Pago</Table.ColHeader>
			    <Table.ColHeader>ID Pedido</Table.ColHeader>
			    <Table.ColHeader>Fecha a Pagar </Table.ColHeader>
			    <Table.ColHeader>Monto</Table.ColHeader>
			  </Table.Header>

			  <Table.Body>
			  { pagos.map( pago => (
			    <Table.Row>
			     	<Table.Col>{pago.id_pago} </Table.Col>
			    	<Table.Col>{pago.id_pedido_pago}</Table.Col>
			    	<Table.Col>{convertISODate(pago.fecha_pago)} </Table.Col>
			     	<Table.Col>{pago.monto_pago} $ </Table.Col>  	
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


export default VerPagos