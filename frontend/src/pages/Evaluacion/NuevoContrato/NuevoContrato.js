import React,{useState,useEffect} from 'react';
import './nuevo-contrato-styles.css';
import IngredienteGeneral from './IngredienteGeneral/IngredienteGeneral'
import IngredienteEsencia from './IngredienteEsencia/IngredienteEsencia'
import {Button,IconButton,Checkbox} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import InfoContrato from './InfoContrato/InfoContrato';
import Envio from './Envio/Envio';
import Pago from './Pago/Pago';
import { useHistory } from "react-router-dom";


const DummyInfoProveedor = {
	id_proveedor: '',
	nombre_proveedor: '',
	web_proveedor: '',
	email_proveedor: ''
}

const DummyInfoProductor = {
	id_productor: '',
	nombre_productor: '',
	web_productor: '',
	email_productor: ''
}


const NuevoContrato = (props) => {

const productorId = localStorage.getItem('id_productor');
const proveedorId = props.match.params.idproveedor
const history = useHistory();

//INFORMACION 
const [infoProveedor,setInfoProveedor] = useState(DummyInfoProveedor);
const [infoProductor,setInfoProductor] = useState(DummyInfoProductor);
///
//OPCIONES
const [opcionesEnvio,setOpcionesEnvio] = useState([])
const [opcionesIngredientes, setOpcionesIngredientes] = useState([])
const [opcionesPago, setOpcionesPago]= useState([])
const [opcionesIEsen, setOpcionesIEsen]= useState([])
const [opcionesIGen, setOpcionesIGen]= useState([])

//SELECCIONADOS
const [ingredientesGen,setIngredientesGen] = useState([])
const [ingredientesEsen,setIngredientesEsen] = useState([])
const [exclusividad, setExclusividad] = useState(false)
const [pagos,setPagos]=useState([])
const [envios,setEnvios]=useState([])

//CONTROLAR EXCLUSIVIDAD
const handleChangeExclusividad = (event) => {
    setExclusividad(event.target.checked);
};


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


//MANEJAR INGREDIENTES ESENCIALES

const agregarIEsen = () => {
	let ingredientesEsenCopy= [...ingredientesEsen]
	ingredientesEsenCopy.push({id:''})
	setIngredientesEsen(ingredientesEsenCopy)
}

const borrarIEsen= (indice) => {
	let ingredientesEsenCopy= [...ingredientesEsen]
	ingredientesEsenCopy.splice(indice,1)
	setIngredientesEsen(ingredientesEsenCopy)
}

const handleChangeIEsen = (indice,e) => {
	let ingredientesEsenCopy= [...ingredientesEsen]
	ingredientesEsenCopy[indice] = opcionesIEsen[e.target.value]
	setIngredientesEsen(ingredientesEsenCopy)
}

// MANEJAR INGREDIENTES GENERALES 
const agregarIGen = () => {
	let ingredientesGenCopy= [...ingredientesGen]
	ingredientesGenCopy.push({id:''})
	setIngredientesGen(ingredientesGenCopy)
}

const borrarIGen= (indice) => {
	let ingredientesGenCopy= [...ingredientesGen]
	ingredientesGenCopy.splice(indice,1)
	setIngredientesGen(ingredientesGenCopy)
}

const handleChangeIGen = (indice,e) => {
	let ingredientesGenCopy= [...ingredientesGen]
	ingredientesGenCopy[indice] = opcionesIGen[e.target.value]
	setIngredientesGen(ingredientesGenCopy)
}


// ENVIAR INDICACIONES CONTRATO
const enviarDatosContrato = (id_contrato)  => {
	
	let promesas = []

	//envios
	envios.forEach(envio => 
		
		promesas.push(
			
			axios.post('/create/cond-env-pago', {
				id_contrato: id_contrato,
		    	id_proveedor: proveedorId,
		    	id_condicion_pago: null,
		    	id_alt_envio: envio.id_alt_envio,
		    	id_pais_alt_envio: envio.id_pais
	  		})
		)
	);

	//pagos
	pagos.forEach(pago => 
		
		promesas.push(
			
			axios.post('/create/cond-env-pago', {
				id_contrato: id_contrato,
		    	id_proveedor: proveedorId,
		    	id_condicion_pago: pago.id_condicion_pago,
		    	id_alt_envio: null,
		    	id_pais_alt_envio: null
	  		})
		)
	);

	//request.body.id_contrato,
    ///request.body.id_ingr_esencia,
    //request.body.id_ingr_general,

    ingredientesGen.forEach(ingrediente => 
		
		promesas.push(
			
			axios.post('/create/clausula-prod', {
				id_contrato: id_contrato,
				id_ingr_general: ingrediente.id_ingrediente_general,
				id_ingr_esencia: null
	  		})
		)
	);

	ingredientesEsen.forEach(ingrediente => 
		
		promesas.push(
			
			axios.post('/create/clausula-prod', {
				id_contrato: id_contrato,
				id_ingr_general: null,
				id_ingr_esencia: ingrediente.id_ingrediente_esencia,
	  		})
		)
	);



	Promise.all(promesas)
	 .then(function (res) {
	    console.log('response promise all', res)
	    alert('Contrato creado con exito')
	    history.push(`/`);
	  });	

}


//CREAR CONTRATO EN BD
const handleSubmit = () => {
	
	//CREAR CONTRATO
	axios.post('/create/contrato', {
	    id_proveedor: proveedorId,
	    id_productor: productorId,
	    exclusivo: exclusividad
	  })
	  .then((res) =>{
	  	console.log('res crear contrato',res.data[0].id_contrato)
	    enviarDatosContrato(res.data[0].id_contrato)
	  })
	  .catch(function (error) {
	    console.log(error);
	  });

}

const parcearIngredienteGeneral = (ingrediente) => {
	let ing = {nombre: ingrediente} 

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


	axios.post('/read/opciones-proveedor/ing-gen-sin-exc', {
	    id_proveedor: proveedorId,
	  })
	  .then((res) =>{
	    console.log('response ing general', res.data);
	     setOpcionesIGen(res.data)
	     setIngredientesGen([])
	  })
	  .catch(function (error) {
	    console.log(error);
	  });

	  axios.post('/read/opciones-proveedor/ing-esen-sin-exc', {
	    id_proveedor: proveedorId,
	  })
	  .then((res) =>{
	    console.log('response ing esen con exc', res.data)
	    setOpcionesIEsen(res.data)
	    setIngredientesEsen([])
	  })
	  .catch(function (error) {
	    console.log(error);
	  });


     
}, []);

useEffect(() => {

	if(exclusividad){
		axios.post('/read/opciones-proveedor/ing-gen-con-exc', {
		    id_proveedor: proveedorId,
		  })
		  .then((res) =>{
		    console.log('response ing general', res.data);
		    setOpcionesIGen(res.data)
		    setIngredientesGen([])

		  })
		  .catch(function (error) {
		    console.log(error);
		  });

		  axios.post('/read/opciones-proveedor/ing-esen-con-exc', {
		    id_proveedor: proveedorId,
		  })
		  .then((res) =>{
		    console.log('response ing esen con exc', res.data)
		    setOpcionesIEsen(res.data)
		    setIngredientesEsen([])
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	} else {

	axios.post('/read/opciones-proveedor/ing-gen-sin-exc', {
	    id_proveedor: proveedorId,
	  })
	  .then((res) =>{
	    console.log('response ing general sin exc', res.data);

	    setOpcionesIGen(res.data)
	    setIngredientesGen([])

	  })
	  .catch(function (error) {
	    console.log(error);
	  });

	  axios.post('/read/opciones-proveedor/ing-esen-sin-exc', {
	    id_proveedor: proveedorId,
	  })
	  .then((res) =>{
	    console.log('response ing esen sin exc', res.data)
	    setOpcionesIEsen(res.data)
	    setIngredientesEsen([])
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
	}
}, [exclusividad]);


return (
		<>
		
		<h1 className="nuevo-contrato-titulo"> Nuevo Contrato</h1>


		
		<div className="nuevo-contrato-content">

		<div className="center">
			<h3 className="nuevo-contrato-subtitle"> Informacion General </h3>
		</div>


		<div className="center">
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
		</div>

		<div className="center">
			<div className="nuevo-contrato-exc-wrapper">
				<h5 className="nuevo-contrato-exc-title">¿De exclusividad? </h5>
				<Checkbox
			        checked={exclusividad}
			        onChange={handleChangeExclusividad}
			        inputProps={{ 'aria-label': 'primary checkbox' }}
	      		/>
	      	</div>
	    </div>

    		<div className="center">
				<div className="nuevo-cont-divider">
				<div className="nuevo-contrato-subtitle-wrapper">
				<h3 className="nuevo-contrato-subtitle"> Ingredientes Generales</h3>
				<Button variant="outlined" size="small" onClick={agregarIGen}>
				  + Nuevo
				</Button>
	        	</div>

				{ingredientesGen.map((ingrediente,indice) => (
					<IngredienteGeneral 
						key={indice} 
						indice={indice}
						handleChange={handleChangeIGen} 
						ingredientes={ingredientesGen} 
						opciones={opcionesIGen}
						handleDelete={borrarIGen}
					/>
				))}
			</div>
			</div>

			<div className="center">
				<div className="nuevo-cont-divider">
				<div className="nuevo-contrato-subtitle-wrapper">
				<h3 className="nuevo-contrato-subtitle"> Ingredientes Esenciales</h3>
				<Button variant="outlined" size="small" onClick={agregarIEsen}>
				  + Nuevo
				</Button>
	        	</div>

				{ingredientesEsen.map((ingrediente,indice) => (
					<IngredienteGeneral 
						key={indice} 
						indice={indice}
						handleChange={handleChangeIEsen} 
						ingredientes={ingredientesEsen} 
						opciones={opcionesIEsen}
						handleDelete={borrarIEsen}
					/>
				))}
				</div>
			</div>
		


			<div className="center">
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
			</div>

			<div className="center">
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
			</div>


			<Button onClick={handleSubmit}variant="contained" className="nuevo-contrato-button">Crear Nuevo Contrato</Button>

			</div>
		</>
)}


export default NuevoContrato