import React,{useState, useEffect} from 'react';
import {Divider, Button} from '@material-ui/core/';
import Detalle from './Detalle/Detalle'
import './agregar-detalles.css'
import axios from 'axios'
import { useHistory } from "react-router-dom";



const DummyIngGeneral = [
    {
	    id_ingrediente_general:1,
	    cas_ingrediente_general:'1',
	    nombre_ingrediente_general:'Alcohol',
	    id_presentacion:1,
	    precio_presentacion:123,
	    volumen_presentacion:70,
   },
   {
	    id_ingrediente_general:2,
	    cas_ingrediente_general:'789',
	    nombre_ingrediente_general:'Jabon',
	    id_presentacion:2,
	    precio_presentacion:456,
	    volumen_presentacion:70,
   }
]


const DummyIngEsencia=[
  {
    id_ingrediente_esencia:1,
    cas_ingrediente_esencia:'101112',
    nombre_ingrediente_esencia:'Alcohol Hisopropilico',
    id_presentacion:3,
    precio_presentacion:789,
    volumen_presentacion:12,
  },
  {
    id_ingrediente_esencia:2,
    cas_ingrediente_esencia:'123',
    nombre_ingrediente_esencia:'Alcohol Propano',
    id_presentacion:4,
    precio_presentacion:1011,
    volumen_presentacion:12,
  },
]


//NO BORRAR
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
	const [detalles,setDetalles] = useState([])
	const [opcionesIng,setOpcionesIng] = useState(filterIng(DummyIngGeneral,DummyIngEsencia))
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
		history.push(`/realizar-pedido/agregar-envio/${id_pedido}`)
	/*let promesas = []
		
		//enviando criterios
		criterios.forEach(crit => 

		promesas.push(		
				axios.post('/create/eval-crit', {
			    	id_productor: productorId, 
			    	peso: crit.peso_prctj_eval_crit,
			    	tipo_eval_crit: tipo,
			    	id_criterio_eval:crit.id_criterio_eval,
		  		})
			)
		
		);

	
		Promise.all(promesas)
		 .then(function (res) {
		    console.log('response promise all', res)
		    alert('Evaluación creada con exito')
		    history.push(`/`);
		  });*/

	}



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