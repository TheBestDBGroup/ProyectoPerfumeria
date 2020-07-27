import React, {useState,useEffect} from 'react';
import {Divider, Button} from '@material-ui/core/';
import './encabezado-pedido.css';
import axios from 'axios'
import { useHistory } from "react-router-dom";


//delete later
let idpedido = 1

const EncabezadoPedido = (props) => {

	const productorId = localStorage.getItem('id_productor');
	const proveedorId = props.match.params.idproveedor
	const contratoId = props.match.params.idcontrato
	const [proveedor,setProveedor] = useState(undefined)
	const [productor,setProductor] = useState(undefined)
	const history = useHistory();
	let today = new Date()

	const handleCancel = () => {
		history.push('/compras')
	}

	const handleSubmit = () => {
		history.push(`/realizar-pedido/agregar-detalles/${idpedido}`)
	}

	const formatDate=(date) => {
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

        axios.post('/read/productor', {id_productor: productorId})
		  .then((res) =>{
		    console.log('response read productor', res.data);
		    setProductor(res.data[0]);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });

		axios.post('/read/proveedor', {id_proveedor: proveedorId})
		  .then((res) =>{
		    console.log('response read proveedor', res.data);
		    setProveedor(res.data[0]);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	     
	}, []);

	if(productor && proveedor) {

		return (
			<>

			<div className="center">
				<h4> Encabezado de Pedido </h4>
			</div>

			<Divider />


			<div className="content-wrapper">
				<div>
					<div className="center">
						<div className="center inner">
							<h6> Productor ID:</h6>
							<p> {productorId}</p>
						</div>
					</div>


					<div className="center">
						<div className="center inner">
							<h6> Nombre Productor:</h6>
							<p> {productor.nombre_productor}</p>
						</div>
					</div>
				</div>


				<div>
					<div className="center">
						<div className="center inner">
							<h6> Proveedor ID:</h6>
							<p> {proveedorId}</p>
						</div>
					</div>

					<div className="center">
						<div className="center inner">
							<h6> Nombre Proveedor:</h6>
							<p> {proveedor.nombre_proveedor}</p>
						</div>
					</div>
				</div>

				<div>
					<div className="center">
						<div className="center inner">
							<h6> Contrato ID:</h6>
							<p> {contratoId}</p>
						</div>
					</div>

					<div className="center">
						<div className="center inner">
							<h6> Fecha:</h6>
							<p> {formatDate(today)}</p>
						</div>
					</div>
				</div>
			</div>


			<div className="center">
				<Button variant="outlined" size="small" onClick={handleCancel}>
					Cancelar
				</Button>

				<Button variant="outlined" size="small" onClick={handleSubmit}>
					Crear Pedido
				</Button>
			</div>

		</>
		)

	} else {
		return <p>Cargando.. </p>
	}
	

	
}


export default EncabezadoPedido