import React, {useState,useEffect} from 'react';
import './evaluacion-renovacion-styles.css';
import InfoProdSubheader from '../../../components/InfoProdSubheader/InfoProdSubheader'
import {Table, Button} from "tabler-react";
import CustomDialog from '../../../components/CustomDialog/CustomDialog'
import { useHistory } from "react-router-dom";
import axios from 'axios'


//TODO Error handling: cuando los proveedores devuelven vacio

//Mostrar lista de proveedores 
const EvaluacionRenovacion = () => {

	const productorId = localStorage.getItem('id_productor');
	const history = useHistory();
	const [selectedProveedor,setSelectedProveedor] = useState({id:0,nombre:''})
	const [proveedores,setProveedores] = useState(undefined)


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

	useEffect(() => {
        axios.post('/read/proveedores-por-renovar', {
		    id_productor: productorId,
		  })
		  .then((res) =>{
		    console.log('response proveedores por renovar', res.data);
            setProveedores(res.data);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	     
	}, []);


	//Esto me quedo feito pero YOLO
	
	//FUNCIONES ALERT NUEVO CONTRATO
	const [open, setOpen] = React.useState(false);
	const dialogTitle = 'Generar contrato'
	const dialogContent = `¿Está seguro que desea generar un nuevo contrato con el proveedor ${selectedProveedor.nombre}?`

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


	//FUNCIONES ALERT RENOVAR//

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


	if(proveedores){
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
			    <Table.ColHeader>ID Contrato</Table.ColHeader>
			     <Table.ColHeader>Fecha Emisión</Table.ColHeader>
			    <Table.ColHeader>Acción</Table.ColHeader>
			  </Table.Header>

			  <Table.Body>
			  { proveedores.map( proveedor => (
			    <Table.Row>
			     	<Table.Col>{proveedor.id_proveedor} </Table.Col>
			    	<Table.Col>{proveedor.nombre_proveedor}</Table.Col>
			    	<Table.Col>{proveedor.web_proveedor} </Table.Col>
			     	<Table.Col>{proveedor.email_proveedor} </Table.Col>
			     	<Table.Col>{proveedor.id_contrato} </Table.Col>
			     	<Table.Col>{convertISODate(proveedor.fecha_emision_contrato)} </Table.Col>	
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
	} else {
		return <p> Cargando... </p>
	}
}


export default EvaluacionRenovacion