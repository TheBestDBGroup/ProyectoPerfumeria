import React,{useState, useEffect} from 'react';
import{FormControl,Select,MenuItem,InputLabel,Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
	  formControl: {
	    margin: theme.spacing(1),
	    minWidth: 250,
	  },
	  selectEmpty: {
	    marginTop: theme.spacing(2),
	  },
}));



const addNoAplica = (array) => {
	array.push({id_alt_envio:'No aplica'})
	return array
}


const AgregarEnvio = (props) => {

	const id_pedido = props.match.params.idpedido
	const id_proveedor = props.match.params.idproveedor
	const id_contrato = props.match.params.idcontrato
	const [envio,setEnvio] = useState([])
	const [opciones, setOpciones] = useState(undefined)
	const history = useHistory();
	const classes = useStyles();



	const renderValue = () => {
		if(envio.id_alt_envio ==='No aplica') {return 'No aplica'}
    	return `ID: ${envio.id_alt_envio}  -  TRANSPORTE: ${envio.transporte_alt_envio}  -  PRECIO: ${envio.costo_alt_envio} - PAIS ${envio.nombre_pais}  ${envio.tiempo_estimado_alt_envio? (`-  TIEMPO ESTIMADO: ${envio.tiempo_estimado_alt_envio} días`):''}`;
	}

	const handleChange = (event) => {
		setEnvio(event.target.value)
	} 

	const handleSubmit = () => {
		if(envio.id_alt_envio ==='No aplica'){
			history.push(`/realizar-pedido/agregar-forma-pago/${id_pedido}/${id_contrato}/${id_proveedor}`)
		} else {		
			axios.post('/update/guardar-alt-env/cond-env-pago', {
			    id_pedido: id_pedido,
			    id_cond_env_pago:envio.id_cond_env_pago
			  })
			  .then((res) =>{
			    console.log('response guardar alt env', res.data);
	            history.push(`/realizar-pedido/agregar-forma-pago/${id_pedido}/${id_contrato}/${id_proveedor}`)
			  })
			  .catch(function (error) {
			    console.log(error);
			  });

		}

	}

	useEffect(() => {

		axios.post('/read/contrato/alternativa-envios', {
		    id_proveedor: id_proveedor,
		    id_contrato:id_contrato
		  })
		  .then((res) =>{
		    console.log('response alt envios', res.data);
            setOpciones(addNoAplica(res.data));
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	     
	}, []);

	if(opciones){

	return(
		<>
		<div className="wrapper">
			<div className="center">
				<h4> Seleccione opción de envío </h4>
			</div>
			
			<div className="center">
	      	<FormControl className={classes.formControl}>
		        <InputLabel> Opción de Envío </InputLabel>
			        <Select
			          renderValue={() => renderValue()}
			          value={envio.id_alt_envio}
			          onChange={value => handleChange(value)}
			        >

			        {opciones.map((val,indiceOp) =>(
			        	<MenuItem value={val}> {val.id_alt_envio==='No aplica'?'No aplica':(`ID: ${val.id_alt_envio} - TRANSPORTE: ${val.transporte_alt_envio} - PRECIO: ${val.costo_alt_envio} - PAIS ${val.nombre_pais}  ${val.tiempo_estimado_alt_envio?(`-  TIEMPO ESTIMADO: ${val.tiempo_estimado_alt_envio} días`):''}`)}</MenuItem>
			        ))}

		        	</Select>
		      	</FormControl>
		    </div>
	      	
	      	<div className="center">
		      	<Button variant="outlined" size="small" onClick={handleSubmit}>
					Seguir a Opción de Pago
				</Button>	
			</div>
		</div>
      	</>
    )

	} else {
		return <p> Cargando </p>
	}

}

export default AgregarEnvio