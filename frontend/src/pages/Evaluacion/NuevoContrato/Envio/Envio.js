import React from 'react'
import{FormControl,Select,MenuItem,InputLabel,Input,IconButton} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
	  formControl: {
	    margin: theme.spacing(1),
	    minWidth: 400,
	  },
	  selectEmpty: {
	    marginTop: theme.spacing(2),
	  },
}));


	//key={indice} 
					//indice={indice} 
					//handleChange={handleChangeEnvio} 
					//envios={envios} 
					//opciones={opcionesEnvio}
					//handleDelete={borrarEnvio}

const Envio = ({indice,handleChange,opciones,envios,handleDelete}) => {
	const classes = useStyles();

	if(envios && envios.length>0 && envios[indice]) {

	const renderValue = () => {
		if(envios[indice].id === '') return ''
    	return `ID ${envios[indice].id_alt_envio} / PAIS ${envios[indice].nombre_pais} / TRANSPORTE ${envios[indice].transporte_alt_envio} / COSTO ${envios[indice].costo_alt_envio}`;
	}



	return(
		<>
		<div className="envio-wrapper">
		{/*<h6> Ingrediente {indice + 1}</h6>*/}
      	<FormControl className={classes.formControl}>
        <InputLabel id={`envio-${indice}`}> Opcion Envio </InputLabel>
	        <Select
	          renderValue={() => renderValue()}
	          value={envios[indice].id_alt_envio}
	          onChange={value => handleChange(indice, value)}
	        >

	        {opciones.map((opcion,indiceOp) =>(
	        	<MenuItem value={indiceOp}> {`ID ${opcion.id_alt_envio} / PAIS ${opcion.nombre_pais} / TRANSPORTE ${opcion.transporte_alt_envio} / COSTO ${opcion.costo_alt_envio}`} </MenuItem>
	        ))}
        	</Select>
      	</FormControl>

      	<IconButton aria-label="delete" onClick={() => handleDelete(indice)}>
        	<DeleteIcon />
      	</IconButton>

      	</div>
		</>
	)}
	else {
		return <> </>
	}

}

export default Envio