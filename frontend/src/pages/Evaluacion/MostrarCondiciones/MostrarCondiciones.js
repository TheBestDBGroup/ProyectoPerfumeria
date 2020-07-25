import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Divider, TextField, Button} from '@material-ui/core/';
import './mostrarcondiciones.css'
import { useHistory } from "react-router-dom";



/*		
*/

const MostrarCondiciones = (props) => {
	const id_proveedor = props.match.params.idproveedor
	const [infoProveedor,setInfoProveedor] = useState(undefined)//
	const [opcionesPago,setOpcionesPago] = useState(undefined)//
	const [opcionesEnvio,setOpcionesEnvio] = useState(undefined)//
	const [ingreEsen,setIngreEsen] = useState(undefined)
	const [ingreGen, setIngreGen] = useState(undefined)
	const history = useHistory();


	//llamadas a servidor
	useEffect(() => {

		let promesas = []    
        
        promesas.push (
          axios.post('/read/proveedor', {
		    id_proveedor: id_proveedor,
		  })
		)
	
        promesas.push(
		 axios.post('/read/contrato/opciones-proveedor/pago', {
		    id_proveedor: id_proveedor,
		  })
		)
	
        promesas.push(
		 axios.post('/read/contrato/opciones-proveedor/envio', {
		    id_proveedor: id_proveedor,
		  })
		)
	
		promesas.push(
		  axios.post('/read/opciones-proveedor/ing-esen-sin-exc', {
		    id_proveedor: id_proveedor,
		  })
		)

		promesas.push(
		  axios.post('/read/opciones-proveedor/ing-gen-sin-exc', {
		    id_proveedor: id_proveedor,
		  })
		)

		Promise.all(promesas)
		 .then(function (res) {
		    console.log('response promise all', res)
		    setInfoProveedor(res[0].data[0])//
		    setOpcionesPago(res[1].data)
		    setOpcionesEnvio(res[2].data)
		    setIngreEsen(res[3].data)
		    setIngreGen(res[4].data)
		 });	
			     
	}, []);

	const handleSubmit = () => {
		history.replace(`/realizar-evaluacion/llenar-criterios/${id_proveedor}/inicial/inicial`);
	}



	if(infoProveedor && opcionesPago && opcionesEnvio && ingreGen && ingreEsen) {

	return (
		<div className="center">
			<div className="mostrar-con-wrapper">
				<div className="center">
					<h2 className="m-c-title"> Mostrar Condiciones del Proveedor </h2>
				</div>
			<Divider/>
			<div className="center">
				<h4 className="m-c-subtitle"> Información del Proveedor </h4>
			</div>
			<div className="center">
				<div className="m-c-label-title">
					<p className="m-c-label"> ID del Proveedor: </p> 
					<p>{id_proveedor} </p>
				</div>
			</div>

			<div className="center">
				<div className="m-c-label-title">
					<p className="m-c-label"> Nombre: </p> 
					<p>{infoProveedor.nombre_proveedor} </p>
				</div>
			</div>

			<div className="center">
				<div className="m-c-label-title">
					<p className="m-c-label"> Web: </p> 
					<p>{infoProveedor.web_proveedor}</p>
				</div>
			</div>

			<div className="center">
				<div className="m-c-label-title">
					<p className="m-c-label"> Email: </p> 
					<p>{infoProveedor.email_proveedor}</p>
				</div>
			</div>
			
			<div className="center">
				<h4 className="m-c-subtitle">Opciones de Pago </h4>
			</div>
	
			{opcionesPago.map( opcion => (
				<>	
				
				<div className="center">
					<div className="m-c-label-title m-c-opcion">
						<p className="m-c-label"> ID de la opción de pago:</p> 
						<p>{opcion.id_condicion_pago}</p>
					</div>
				</div>

				<div className="center">
					<div className="m-c-label-title">
						<p className="m-c-label"> Tipo: </p> 
						<p>{opcion.tipo_condicion_pago}</p>
					</div>
				</div>


				{opcion.cuotas_condicion_pago !== null? (
					<div className="center">
						<div className="m-c-label-title">
							<p className="m-c-label"> Cuotas: </p> 
								<p> 
									{opcion.cuotas_condicion_pago} cuotas de {opcion.prctj_cuotas_condicion_pago}% 
									a pagar cada {opcion.mesescantidad_condicion_pago} mese(s)
								</p>
						</div>
					</div>
				):null}
				</>
			))}		

			<div className="center">
				<h4 className="m-c-subtitle">Opciones de Envio</h4>
			</div>
	
			{opcionesEnvio.map( opcion => (
				<>
				<div className="center">
					<div className="m-c-label-title m-c-opcion">
						<p className="m-c-label"> ID de la opción de envío</p> 
						<p>{opcion.id_alt_envio}</p>
					</div>
				</div>

				<div className="center">
					<div className="m-c-label-title">
						<p className="m-c-label">  País</p> 
						<p>{opcion.nombre_pais}</p>
					</div>
				</div>

				<div className="center">
					<div className="m-c-label-title">
						<p className="m-c-label"> Transporte</p> 
						<p>{opcion.transporte_alt_envio}</p>
					</div>
				</div>
				
				 
				{opcion.tiempo_estimado_alt_envio === null?'':(

					<div className="center">
						<div className="m-c-label-title">
							<p className="m-c-label"> 
								Tiempo Estimado: 
							</p> 
								<p> 
									{opcion.tiempo_estimado_alt_envio}
								</p>
						</div>
					</div>
				)}
					

				</>
			))}	

			<div className="center">
				<h4 className="m-c-subtitle">Ingredientes </h4>
			</div>

			{ingreGen.map( opcion => (
				<>
				<div className="center">
					<div className="m-c-label-title m-c-opcion">
						<p className="m-c-label"> ID Ingrediente General: </p> 
						<p>{opcion.id_ingrediente_general}</p>
					</div>
				</div>

				<div className="center">
					<div className="m-c-label-title">
						<p className="m-c-label">  Nombre:</p> 
						<p>{opcion.nombre_ingrediente_general}</p>
					</div>
				</div>

				<div className="center">
					<div className="m-c-label-title">
						<p className="m-c-label"> CAS </p> 
						<p>{opcion.cas_ingrediente_general}</p>
					</div>
				</div>
				
				</>
			))}		

			{ingreEsen.map( opcion => (
				<>
				<div className="center">
					<div className="m-c-label-title m-c-opcion">
						<p className="m-c-label"> ID Ingrediente Esencia: </p> 
						<p>{opcion.id_ingrediente_esencia}</p>
					</div>
				</div>

				<div className="center">
					<div className="m-c-label-title">
						<p className="m-c-label">  Nombre:</p> 
						<p>{opcion.nombre_ingrediente_esencia}</p>
					</div>
				</div>

				<div className="center">
					<div className="m-c-label-title">
						<p className="m-c-label"> CAS </p> 
						<p>{opcion.cas_ingrediente_esencia}</p>
					</div>
				</div>
				
				</>
			))}		

			<div className="center m-c-button">
				<Button 
					variant="outlined" 
					color="primary"
					size="small" 
					onClick={handleSubmit}
				>
					Realizar Evaluación Inicial
					
				</Button>
			</div>

			</div>
		</div>
	)} else {
		return <p> Cargando...</p>
	}
}

export default MostrarCondiciones