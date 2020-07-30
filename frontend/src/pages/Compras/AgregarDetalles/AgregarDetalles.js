import React,{useState, useEffect} from 'react';
import {Divider, Button} from '@material-ui/core/';
import Detalle from './Detalle/Detalle'
import './agregar-detalles.css'
import axios from 'axios'
import { useHistory } from "react-router-dom";



const filterIng = (IngGeneral,IngEsencia) => {
	let ingredientes = []

	IngEsencia.forEach(ing=> {

		ingredientes.push({
			id: ing.id_ingrediente_esencia,
			cas: ing.cas_ingrediente_esencia,
			nombre: ing.nombre_ingrediente_esencia,
			id_presentacion: ing.id_presentacion,
			precio_presentacion:ing.precio_presentacion,
			volumen_presentacion:ing.volumen_presentacion,
			cantidad:''
		})

	})

	IngGeneral.forEach(ing=> {

		ingredientes.push({
			id: ing.id_ingrediente_general,
			cas: ing.cas_ingrediente_general,
			nombre: ing.nombre_ingrediente_general,
			id_presentacion: ing.id_presentacion,
			precio_presentacion:ing.precio_presentacion,
			volumen_presentacion:ing.volumen_presentacion,
			cantidad:''
		})

	})

	return ingredientes

}

const AgregarDetalles = (props) => {

	const id_pedido = props.match.params.idpedido
	const id_proveedor = props.match.params.idproveedor
	const id_contrato = props.match.params.idcontrato
	const [detalles,setDetalles] = useState([])
	const [opcionesIng,setOpcionesIng] = useState(undefined)
	const history = useHistory();

	//MANEJAR DETALLES

	const agregarDetalle = () => {
		let detalleCopy = [...detalles]
		detalleCopy.push({id:'',cantidad:''})
		setDetalles(detalleCopy)
	}

	const borrarDetalle = (indice) => {
		let detalleCopy = [...detalles]
		detalleCopy.splice(indice,1)
		setDetalles(detalleCopy) 
	}

	const handleChangeDetalle = (indice,e) => {
		let detalleCopy = [...detalles]
		let cantidad = detalleCopy[indice].cantidad
		detalleCopy[indice] = opcionesIng[e.target.value]
		detalleCopy[indice].cantidad = cantidad
		setDetalles(detalleCopy) 
	}

	const handleCantidadDetalle =(indice, e) => {
		let detalleCopy =[...detalles]
		detalleCopy[indice].cantidad = e.target.value
		setDetalles(detalleCopy)
	}


	const calcularMonto = (dets) => {

		let total = 0

		dets.forEach( det => {
			total = total + det.precio_presentacion * det.cantidad
		})

		return total
	}

	const handleSubmit=() => {
		console.log('detalles',detalles)
		let monto_total = calcularMonto(detalles)
		console.log('monto total', monto_total)


		
		let promesas = []
		
		//enviando detalles
		detalles.forEach(det => 

		promesas.push(		
				axios.post('/create/detalle-pedido', {
			    	id_presentacion: det.id_presentacion, 
			    	id_pedido: id_pedido,
			    	cantidad: det.cantidad
		  		})
			)
		
		);

		promesas.push(		
			axios.post('/update/monto-de-pedido', {
		    	monto_pedido:monto_total, 
		    	id_pedido: id_pedido
	  		})
		)


	
		Promise.all(promesas)
		 .then(function (res) {
		    console.log('response promise all', res)
		    history.push(`/realizar-pedido/agregar-envio/${id_pedido}/${id_contrato}/${id_proveedor}`)
		  });

	}


	useEffect(() => {

		let promesas = []
       	
       	promesas.push(
		  axios.post('/read/contrato/ingrediente-esencia', {
		    id_proveedor: id_proveedor,
		    id_contrato: id_contrato
		  })
		)

		promesas.push(
		  axios.post('/read/contrato/ingrediente-general', {
		    id_proveedor: id_proveedor,
		    id_contrato:id_contrato
		  })
		)

		Promise.all(promesas)
		 .then(function (res) {
		    console.log('response promise all', res)
		    setOpcionesIng(filterIng(res[1].data, res[0].data))
		  
		 });	
	     
	}, []);



  if(opcionesIng){
	return (
		<>
				
			<div className="center-everything">
				<div className="crear-evaluacion-wrapper">
					<div className="center-title">
						<h3> Agregar Detalles a Pedido</h3>
					</div>
					

					<Divider />
					

					
					<div className="center-title">
						<div className="criterios-eval-wrapper">

							<Button variant="outlined" size="small" onClick={agregarDetalle}>
							  + Nuevo
							</Button>


							{detalles.map((detalle,indice) => (
								<Detalle
									key={indice} 
									indice={indice}
									handleChange={handleChangeDetalle} 
									detalles={detalles} 
									opciones={opcionesIng}
									handleDelete={borrarDetalle}
									handleCantidadDetalle={handleCantidadDetalle}
								/>
							))}

							<div className="center-title">
								<Button variant="outlined" size="small" className="crit-eval-submit-button" onClick={handleSubmit}>
								  Guardar y seguir a opciones de envío
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>


		</>

	)
	} else {
		return <>Cargando... </>
	}
}

export default AgregarDetalles