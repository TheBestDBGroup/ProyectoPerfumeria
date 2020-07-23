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


const Ingrediente = ({indice,handleChange,opciones,ingredientes,handleDelete}) => {
	const classes = useStyles();

	if(ingredientes && ingredientes.length>0 && ingredientes[indice]) {

	const renderValue = () => {
		if(ingredientes[indice].id === '') return ''
    	return `ID ${ingredientes[indice].id_ingrediente_esencia} / CAS ${ingredientes[indice].cas_ingrediente_esencia} / NOMBRE ${ingredientes[indice].nombre_ingrediente_esencia} `;
	}



	return(
		<>
		<div className="ingrediente-wrapper">
		{/*<h6> Ingrediente {indice + 1}</h6>*/}
      	<FormControl className={classes.formControl}>
        <InputLabel id={`ingrediente-${indice}`}> Ingrediente General </InputLabel>
	        <Select
	          labelId={`ingrediente-${indice}`}
	          id={`ingrediente-${indice}`}
	          label={ingredientes[indice].nombre}
	          renderValue={() => renderValue()}
	          value={ingredientes[indice].id_ingrediente_general}
	          onChange={value => handleChange(indice, value)}
	          placeholder={ingredientes[indice].nombre}
	        >

	        {opciones.map((opcion,indiceOp) =>(
	        	<MenuItem value={indiceOp}> ID {opcion.id_ingrediente_esencia} / CAS {opcion.cas_ingrediente_esencia} / NOMBRE {opcion.nombre_ingrediente_esencia} </MenuItem>
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

export default Ingrediente