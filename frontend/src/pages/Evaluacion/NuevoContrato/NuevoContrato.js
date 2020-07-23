import React,{useState,useEffect} from 'react';
import './nuevo-contrato-styles.css';
import Ingrediente from './Ingrediente/Ingrediente'
import {Button,IconButton,Checkbox} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import InfoContrato from './InfoContrato/InfoContrato';
import Envio from './Envio/Envio';
import Pago from './Pago/Pago';



const DummyIngredientes = [	
	{
		id: 1,
		cas: '12345',
		nombre: 'Vainilla Sensual',
		presentaciones:[ 
			{precio:20, volumen:'20ml', id:1},
			{precio:40, volumen:'40ml', id:2},
			{precio:50, volumen:'30ml', id:3},
		]
	},
	{
		id: 2,
		cas: '12345',
		nombre: 'Chocolate',
		presentaciones:[ 
			{precio:20, volumen:'20ml',id:4},
			{precio:40, volumen:'40ml',id:5},
			{precio:50, volumen:'30ml',id:6},
		]
	},
	{
		id: 2,
		cas: '12345',
		nombre: 'Canela Pasion',
		presentaciones:[ 
			{precio:20, volumen:'20ml',id:7},
			{precio:40, volumen:'40ml',id:8},
			{precio:50, volumen:'30ml',id:9},
		]
	},
];


const DummyInfoProveedor = {
	id_proveedor: 1,
	nombre_proveedor: 'Los Padrinos Magicos Prov',
	web_proveedor: 'www.web.com',
	email_proveedor: 'maria@gmail.com'
}

const DummyInfoProductor = {
	id_productor: 1,
	nombre_productor: 'Las Chicas Superpoderosas Prod',
	web_productor: 'www.web.com',
	email_productor: 'pedro@gmail.com'
}


const NuevoContrato = (props) => {

const productorId = localStorage.getItem('id_productor');
const proveedorId = props.match.params.idproveedor

//INFORMACION 
const [infoProveedor,setInfoProveedor] = useState(DummyInfoProveedor);
const [infoProductor,setInfoProductor] = useState(DummyInfoProductor);

//OPCIONES
const [opcionesEnvio,setOpcionesEnvio] = useState([])
const [opcionesIngredientes, setOpcionesIngredientes] = useState(DummyIngredientes)
const [opcionesPago, setOpcionesPago]= useState([])

//SELECCIONADOS
const [ingredientes,setIngredientes] = useState([])
const [presentaciones,setPresentaciones] = useState([])
const [exclusividad, setExclusividad] = useState(false)
const [pagos,setPagos]=useState([])
const [envios,setEnvios]=useState([])

//CONTROLAR EXCLUSIVIDAD
const handleChangeExclusividad = (event) => {
    setExclusividad(event.target.checked);
};


//CONTROLAR INGREDIENTES
const handleChangeIngredientes = (indice, e) => {
	let ingredientesCopy = [...ingredientes]
	ingredientesCopy[indice] = opcionesIngredientes[e.target.value]
	let presentacionesCopy = [...presentaciones]
	presentacionesCopy[indice] = {precio:'', volumen:'', id:''}
	setPresentaciones(presentacionesCopy)
	setIngredientes(ingredientesCopy)
}

const handleChangePres = (indice, e) => {
	let presentacionesCopy = [...presentaciones]
	presentacionesCopy[indice] = ingredientes[indice].presentaciones[e.target.value]
	setPresentaciones(presentacionesCopy)
}

const agregarIngrediente = () => {	
	let ingredientesCopy = [...ingredientes]
	let presentacionesCopy = [...presentaciones]
	ingredientesCopy.push({nombre:'', id:'', cas:''})
	presentacionesCopy.push({precio:'', volumen:'', id:''})
	setIngredientes(ingredientesCopy)
	setPresentaciones(presentacionesCopy)
}

const borrarIngrediente = (indice) => {
	let ingredientesCopy = [...ingredientes]
	let presentacionesCopy = [...presentaciones]
    ingredientesCopy.splice(indice,1)
    presentacionesCopy.splice(indice,1)
    setIngredientes(ingredientesCopy)
    setPresentaciones(presentacionesCopy)
}


//MANEJAR ENVIOS

const agregarEnvio = () => {
	let enviosCopy = [...envios]
	enviosCopy.push({id:''})
	setEnvios(enviosCopy)
}

const borrarEnvio = (indice) => {
	let enviosCopy = [...envios]
	enviosCopy.splice(indice,1)
	setEnvios(enviosCopy) 
}

const handleChangeEnvio = (indice,e) => {
	let enviosCopy = [...envios]
	enviosCopy[indice] = opcionesEnvio[e.target.value]
	setEnvios(enviosCopy)
}


//MANEJAR PAGOS

const agregarPago = () => {
	let pagosCopy = [...pagos]
	pagosCopy.push({id:''})
	setPagos(pagosCopy)
}

const borrarPago = (indice) => {
	let pagosCopy = [...pagos]
	pagosCopy.splice(indice,1)
	setPagos(pagosCopy) 
}

const handleChangePago = (indice,e) => {
	let pagosCopy = [...pagos]
	pagosCopy[indice] = opcionesPago[e.target.value]
	setPagos(pagosCopy)
}


//LLAMADAS INICIALES
useEffect(() => {

	//INFO PROV
	axios.post('/read/proveedor', {
	    id_proveedor: proveedorId,
	  })
	  .then((res) =>{
	    console.log('response info prov', res.data[0]);
	    setInfoProveedor(res.data[0])
	  })
	  .catch(function (error) {
	    console.log(error);
	  });

	//TODO: INFO PROD
	axios.post('/read/productor', {
	    id_productor: productorId ,
	  })
	  .then((res) =>{
	    console.log('response info prod', res.data[0]);
	    setInfoProductor(res.data[0])
	  })
	  .catch(function (error) {
	    console.log(error);
	  });

	//OPCIONES ENVIO
    axios.post('/read/contrato/opciones-proveedor/envio', {
	    id_proveedor: proveedorId,
	  })
	  .then((res) =>{
	    console.log('response opciones envio', res.data);
	    setOpcionesEnvio(res.data)
	  })
	  .catch(function (error) {
	    console.log(error);
	  });

	//OPCIONES PAGO
	axios.post('/read/contrato/opciones-proveedor/pago', {
	    id_proveedor: proveedorId,
	  })
	  .then((res) =>{
	    console.log('response opciones de pago', res.data);
	    setOpcionesPago(res.data)
	  })
	  .catch(function (error) {
	    console.log(error);
	});

	//TODO: INGREDIENTES
     
}, []);


return (
		<>
		
		<h1 className="nuevo-contrato-titulo"> Nuevo Contrato</h1>


		
		<div className="nuevo-contrato-content">

		<h3 className="nuevo-contrato-subtitle"> Informacion General </h3>

		<div className="info-wrapper">
			<div className="info-content">
				<h6> Información Productor </h6>
				<InfoContrato 
					nombre={infoProductor.nombre_productor} 
					web={infoProductor.web_productor}
					email={infoProductor.email_productor}
					id={infoProductor.id_productor}
				/>
			</div>
			
			<div className="info-content">
				<h6> Información Proveedor</h6>
				<InfoContrato 
					nombre={infoProveedor.nombre_proveedor} 
					web={infoProveedor.web_proveedor}
					email={infoProveedor.email_proveedor}
					id={infoProveedor.id_proveedor}
				/>
			</div>
		</div>
		<div className="nuevo-contrato-exc-wrapper">
			<h5 className="nuevo-contrato-exc-title">¿De exclusividad? </h5>
			<Checkbox
		        checked={exclusividad}
		        onChange={handleChangeExclusividad}
		        inputProps={{ 'aria-label': 'primary checkbox' }}
      		/>
      	</div>
			<div className="nuevo-cont-divider">
			<div className="nuevo-contrato-subtitle-wrapper">
			<h3 className="nuevo-contrato-subtitle"> Ingredientes</h3>
			<Button variant="outlined" size="small" onClick={agregarIngrediente}>
			  + Nuevo
			</Button>
        	</div>

			{console.log('ingredientes',ingredientes)}
			{ingredientes.map((ingrediente,indice) => (
				<Ingrediente 
					key={indice} 
					indice={indice} 
					handleChangePres={handleChangePres}
					handleChange={handleChangeIngredientes} 
					ingredientes={ingredientes} 
					presentaciones={presentaciones} 
					opciones={opcionesIngredientes}
					handleDelete={borrarIngrediente}
				/>
			))}
			</div>



			<div className="nuevo-cont-divider">
			<div className="nuevo-contrato-subtitle-wrapper">
			<h3 className="nuevo-contrato-subtitle"> Opciones de Envio</h3>
			
			<Button variant="outlined" size="small" onClick={agregarEnvio}>
			  + Nuevo
			</Button>
        	</div>
			{envios.map((envio,indice) => (
				<Envio
					key={indice} 
					indice={indice} 
					handleChange={handleChangeEnvio} 
					envios={envios} 
					opciones={opcionesEnvio}
					handleDelete={borrarEnvio}
				/>
			))}
			</div>


			<div className="nuevo-cont-divider">
			<div className="nuevo-contrato-subtitle-wrapper">
			<h3 className="nuevo-contrato-subtitle"> Opciones de Pago</h3>
			
			<Button variant="outlined" size="small" onClick={agregarPago}>
			  + Nuevo
			</Button>
        	</div>
			{pagos.map((pago,indice) => (
				<Pago
					key={indice} 
					indice={indice} 
					handleChange={handleChangePago} 
					pagos={pagos} 
					opciones={opcionesPago}
					handleDelete={borrarPago}
				/>
			))}
			</div>


			<Button variant="contained" className="nuevo-contrato-button">Crear Nuevo Contrato</Button>

			</div>
		</>
)}


export default NuevoContrato