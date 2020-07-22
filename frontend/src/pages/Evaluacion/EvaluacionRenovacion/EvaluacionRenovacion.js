import React, {useState} from 'react';
import './evaluacion-renovacion-styles.css';
import InfoProdSubheader from '../../../components/InfoProdSubheader/InfoProdSubheader'
import {Table, Button} from "tabler-react";
import CustomDialog from '../../../components/CustomDialog/CustomDialog'
import { useHistory } from "react-router-dom";



//TODO Error handling: cuando los proveedores devuelven vacio


const DummyProveedores = [
	
	{ 
		id_proveedor: 1,
		nombre_proveedor:'Proveedor El perfumista',
		web_proveedor: 'www.proveedor.com',
		email_proveedor: 'proveedor@gmail.com',
		paises_envio_proveedor: ['Holanda', 'Canada','Francia']
	},
	{ 
		id_proveedor: 2,
		nombre_proveedor:'Proveedor El perfumista',
		web_proveedor: 'www.proveedor.com',
		email_proveedor: 'proveedor@gmail.com',
		paises_envio_proveedor: ['Holanda', 'Canada','Francia', 'Francia','Francia','Francia','Francia','Francia','Francia','Francia']
	},
	{ 
		id_proveedor: 3,
		nombre_proveedor:'Proveedor El perfumista',
		web_proveedor: 'www.proveedor.com',
		email_proveedor: 'proveedor@gmail.com',
		paises_envio_proveedor: ['Holanda', 'Canada','Francia']
	},
]


//Mostrar lista de proveedores 
const EvaluacionRenovacion = () => {

	const productorId = localStorage.getItem('id_productor');
	const proveedores = DummyProveedores //convertir a estado
	const history = useHistory();
	const [selectedProveedor,setSelectedProveedor] = useState({id:0,nombre:''})

	//Esto me quedo feito pero YOLO
	
	//Funciones y constantes que manejan el alert de Nuevo contrato
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


	//Funciones y constantes que manejan el alert de Renovacion de contrato

	const [openRenovar, setOpenRenovar] = React.useState(false);
	const dialogTitleRenovar = 'Renovar Contrato'
	const dialogContentRenovar = `¿Está seguro que desea renovar el contrato con el proveedor ${selectedProveedor.nombre}?`

	const handleClickOpenRenovar = () => {
	    setOpenRenovar(true);
	  };

	const handleCloseRenovar = () => {
	    setOpenRenovar(false);
	};
  	
  	const handleSubmitRenovar = () => {
  		//TODO: Renovar contrato en BD
  		handleCloseRenovar()
  		alert('Contrato Renovado')

  	}
  
  	const handleSelectRenovar = (id,nombre) => {
		setSelectedProveedor({id:id,nombre:nombre})
		handleClickOpenRenovar()
	}



	return (
		<>
		<InfoProdSubheader redirectDir={'evaluacion'}/>
		<h1 className="evaluacion-inicial-titulo"> Seleccione el proveedor sobre el que desea realizar renovar contrato </h1>

		{/* Alerts*/}
		<CustomDialog open={open} handleClose={handleClose} handleSubmit={handleSubmit} title={dialogTitle} content={dialogContent}/>
		<CustomDialog open={openRenovar} handleClose={handleCloseRenovar} handleSubmit={handleSubmitRenovar} title={dialogTitleRenovar} content={dialogContentRenovar}/>
		
		
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
			        	<Button onClick={() => handleSelectRenovar(proveedor.id_proveedor, proveedor.nombre_proveedor)} color="primary" className="eval-ren-buttons">Renovar</Button>
			        	<Button onClick={() => handleSelect(proveedor.id_proveedor, proveedor.nombre_proveedor)} color="primary" className="eval-ren-buttons">Crear Nuevo</Button>
			      	</Table.Col>
			    </Table.Row>
			   ))}

			  </Table.Body>
		</Table>
		</>

	);
}


export default EvaluacionRenovacion