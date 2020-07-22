import React, {useState} from 'react';
import './evaluacion-inicial-styles.css';
import InfoProdSubheader from '../../../components/InfoProdSubheader/InfoProdSubheader'
import {Table, Button} from "tabler-react";
import CustomDialog from '../../../components/CustomDialog/CustomDialog'
import { useHistory } from "react-router-dom";






const DummyProveedores = [
	
	{ 
		id_proveedor: 1,
		nombre_proveedor:'Proveedor El perfumista',
		web_proveedor: 'www.proveedor.com',
		email_proveedor: 'proveedor@gmail.com',
		nombre_pais: "Gabón"
	},
	{ 
		id_proveedor: 2,
		nombre_proveedor:'Proveedor El perfumista',
		web_proveedor: 'www.proveedor.com',
		email_proveedor: 'proveedor@gmail.com',
		nombre_pais:"Alemania"
	},
	{ 
		id_proveedor: 1,
		nombre_proveedor:'Proveedor El perfumista',
		web_proveedor: 'www.proveedor.com',
		email_proveedor: 'proveedor@gmail.com',
		nombre_pais: "Holanda"
	},
	{ 
		id_proveedor: 1,
		nombre_proveedor:'Proveedor El perfumista',
		web_proveedor: 'www.proveedor.com',
		email_proveedor: 'proveedor@gmail.com',
		nombre_pais: "Filipinas"
	},
	
]


//Mostrar lista de proveedores 
const EvaluacionInicial = () => {

	const productorId = localStorage.getItem('id_productor');
	 //convertir a estado
	const [proveedores, setSelectedProveedores] = useState(undefined)
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
	       	uniqueIDs[proveedor.id_proveedor].paises_envio_proveedor.push(proveedor.nombre_pais)
	        return false;
	    }

		    uniqueIDs[proveedor.id_proveedor] = proveedor;
		    uniqueIDs[proveedor.id_proveedor].paises_envio_proveedor = [];
		    uniqueIDs[proveedor.id_proveedor].paises_envio_proveedor.push(proveedor.nombre_pais)
		    return true;
		});

	}

	return arrayProv


	}

	

	if(proveedores){

	return (
		<>
		<InfoProdSubheader redirectDir={'evaluacion'}/>
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
		return <p>Cargando... </p>
	}
}


export default EvaluacionInicial 