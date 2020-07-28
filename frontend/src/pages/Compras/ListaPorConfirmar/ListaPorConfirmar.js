import React, {useState,useEffect} from 'react';
import './lista-por-confirmar.css';
import InfoProveeSubheader from '../../../components/InfoProveeSubheader/InfoProveeSubheader'
import {Table, Button} from "tabler-react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Redirect } from 'react-router-dom'


//Mostrar lista de proveedores 
const ListaPedidos = () => {

	const proveedorId = localStorage.getItem('id_proveedor');
	const history = useHistory();
	const [pedidos,setPedidos] = useState(undefined)


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

		 axios.post('/update/rechazar-pedido', {
		    id_pedido:id_pedido,
		  })
		  .then((res) =>{
		    console.log('response pedido rechazar', res.data);
            history.push('/')
		  })
		  .catch(function (error) {
		    console.log(error);
		  });

	}

	const handleAceptPedido = (pedido) => {



		if(pedido.tipo_condicion_pago ==="Contado"){
			 console.log('Contadoooo')

			 axios.post('/create/pago-contado', {
			    id_pedido: pedido.id_pedido,
			  })
			  .then((res) =>{
			    console.log('pago contado', res.data);
	           	history.push('/')
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
		} else {
			
			console.log('Creditoooooo')
			let max = parseInt(pedido.cuotas_condicion_pago)
			let counter = 1

			let promesas = []

			while(max>0) {

				  promesas.push (
			          axios.post('/create/pago-credito', {
					    id_proveedor: proveedorId,
					    num_cuota:counter,
					    porcentaje_cuotas:parseInt(pedido.prctj_cuotas_condicion_pago),
					    meses_cantidad:parseInt(pedido.mesescantidad_condicion_pago)
					  })
					)

				max--
				counter++
			}

			Promise.all(promesas)
			 .then(function (res) {
			    console.log('response promise all', res)
			    alert('Ha aceptado su pedido')
			    history.push('/')
			});	

		}
		
	}



	useEffect(() => {
		
        axios.post('/read/pedido/pedidos-por-confirmar-proveedor', {
		    id_proveedor: proveedorId,
		  })
		  .then((res) =>{
		    console.log('response pedidos por confirmar proveedor', res.data);
            setPedidos(res.data);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	     
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
				        		onClick={() => handleAceptPedido(pedido)} 
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