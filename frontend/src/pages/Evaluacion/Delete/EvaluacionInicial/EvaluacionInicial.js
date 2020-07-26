import React, {useState,useEffect} from 'react';
import './evaluacion-inicial-styles.css';
import InfoProdSubheader from '../../../components/InfoProdSubheader/InfoProdSubheader'
import {Table, Button} from "tabler-react";
import CustomDialog from '../../../components/CustomDialog/CustomDialog'
import { useHistory } from "react-router-dom";
import axios from 'axios'


//Mostrar lista de proveedores 
const EvaluacionInicial = () => {

	const productorId = localStorage.getItem('id_productor');
	 //convertir a estado
	const [proveedores, setProveedores] = useState(undefined)
	const history = useHistory();
	const [selectedProveedor,setSelectedProveedor] = useState({id:0,nombre:''})
	
	//Funciones y constantes que manejan el alert 
	const [open, setOpen] = React.useState(false);
	const dialogTitle = 'Generar contrato'
	const dialogContent = `¿Está seguro que desea generar un contrato con el proveedor ${selectedProveedor.nombre}?`

	const handleClickOpen = () => {
	    setOpen(true);
	  };

	const handleClose = () => {
	    setOpen(false);
	};
  	
  	const handleSubmit = () => {
  		history.push(`/contrato/generar/${selectedProveedor.id}`);
  	}
  	

  	//funcion para manejar proveedor
  	const handleSelect = (id,nombre) => {
		setSelectedProveedor({id:id,nombre:nombre})
		handleClickOpen()
	}


	const filterCountry=(arrayProv)=> {

	let uniqueIDs = {};

	if(arrayProv.length>0){
	
		arrayProv = arrayProv.filter(function(proveedor) {
	    if (uniqueIDs.hasOwnProperty(proveedor.id_proveedor)) {
	       	uniqueIDs[proveedor.id_proveedor].paises_envio_proveedor.push(proveedor.pais_envio)
	        return false;
	    }

		    uniqueIDs[proveedor.id_proveedor] = proveedor;
		    uniqueIDs[proveedor.id_proveedor].paises_envio_proveedor = [];
		    uniqueIDs[proveedor.id_proveedor].paises_envio_proveedor.push(proveedor.pais_envio)
		    return true;
		});

	}

	return arrayProv


	}

	useEffect(() => {
        axios.post('/read/proveedores-potenciales', {
		    id_productor: productorId,
		  })
		  .then((res) =>{
		    console.log('response proveedores potenciales', res.data);
            setProveedores(filterCountry(res.data));
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	     
	}, []);

	/**/

	//RETORNOS

	if(proveedores){

	return (
		<>
		<InfoProdSubheader redirectDir={'evaluacion'}/>
		{console.log('proveedores',proveedores)}
		<h1 className="evaluacion-inicial-titulo"> Seleccione el proveedor sobre el que desea realizar evaluación inicial </h1>

		<CustomDialog open={open} handleClose={handleClose} handleSubmit={handleSubmit} title={dialogTitle} content={dialogContent}/>
		
		<Table>

			  <Table.Header>
			    <Table.ColHeader>ID</Table.ColHeader>
			    <Table.ColHeader>Nombre</Table.ColHeader>
			    <Table.ColHeader>Web</Table.ColHeader>
			    <Table.ColHeader>Email</Table.ColHeader>
			    <Table.ColHeader>Países a los que Envía</Table.ColHeader>
			    <Table.ColHeader>Acción</Table.ColHeader>
			  </Table.Header>

			  <Table.Body>
			  { proveedores.map( proveedor => (
			    <Table.Row>
			     	<Table.Col>{proveedor.id_proveedor} </Table.Col>
			    	<Table.Col>{proveedor.nombre_proveedor}</Table.Col>
			    	<Table.Col>{proveedor.web_proveedor} </Table.Col>
			     	<Table.Col>{proveedor.email_proveedor} </Table.Col>
			     	<Table.Col className="evaluacion-inicial-paises">{proveedor.paises_envio_proveedor.join(' , ')} </Table.Col>
			    	<Table.Col>
			        	<Button onClick={() => handleSelect(proveedor.id_proveedor, proveedor.nombre_proveedor)} color="primary">Generar Contrato</Button>
			      	</Table.Col>
			    </Table.Row>
			   ))}

			  </Table.Body>
		</Table>
		</>

	);

	} else {
		return (<>
			{console.log('proveedores',proveedores)}
			<p>Cargando... </p>
			</>
		)
	}
}


export default EvaluacionInicial 