import React,{useState} from 'react';
import{FormControl,Select,MenuItem,InputLabel,Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";



const useStyles = makeStyles((theme) => ({
	  formControl: {
	    margin: theme.spacing(1),
	    minWidth: 250,
	  },
	  selectEmpty: {
	    marginTop: theme.spacing(2),
	  },
}));

const DummyOpciones = [
  { 
    id_alt_envio: 1,
    transporte_alt_envio:'Barco', 
    costo_alt_envio: 23,
    tiempo_estimado_alt_envio:20,
    id_cond_env_pago:2
  },
  { 
    id_alt_envio: 3,
    transporte_alt_envio:'Avion', 
    costo_alt_envio: 33,
    tiempo_estimado_alt_envio:20,
    id_cond_env_pago:4
  },
  { 
    id_alt_envio: 5,
    transporte_alt_envio:'Yate', 
    costo_alt_envio: 77,
    tiempo_estimado_alt_envio:240,
    id_cond_env_pago:6
  }, 
  {
  	id_alt_envio:'No aplica'
  }
]


const addNoAplica = (array) => {
	array.push({id_alt_envio:'No aplica'})
	return array
}


const AgregarEnvio = (props) => {

	const id_pedido = props.match.params.idpedido
	const [envio,setEnvio] = useState([])
	const [opciones, setOpciones] = useState(DummyOpciones)
	const history = useHistory();
	const classes = useStyles();



	const renderValue = () => {
		if(envio.id_alt_envio ==='No aplica') {return 'No aplica'}
    	return `ID: ${envio.id_alt_envio}  -  TRANSPORTE: ${envio.transporte_alt_envio}  -  PRECIO: ${envio.costo_alt_envio}    ${envio.tiempo_estimado_alt_envio? (`-  TIEMPO ESTIMADO: ${envio.tiempo_estimado_alt_envio} días`):''}`;
	}

	const handleChange = (event) => {
		setEnvio(event.target.value)
	} 

	const handleSubmit = () => {
		//if no aplica no mandarlo a DB
		history.push(`/realizar-pedido/agregar-forma-pago/${id_pedido}`)
	}

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
			        	<MenuItem value={val}> {val.id_alt_envio==='No aplica'?'No aplica':(`ID: ${val.id_alt_envio} - TRANSPORTE: ${val.transporte_alt_envio} - PRECIO: ${val.costo_alt_envio} ${val.tiempo_estimado_alt_envio?(`-  TIEMPO ESTIMADO: ${val.tiempo_estimado_alt_envio} días`):''}`)}</MenuItem>
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

}

export default AgregarEnvio