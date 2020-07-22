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


const Ingrediente = ({indice,handleChange,handleChangePres,opciones,ingredientes,presentaciones,handleDelete}) => {
	const classes = useStyles();

	if(ingredientes && ingredientes.length>0 && ingredientes[indice]) {

	const renderValue = () => {
		if(ingredientes[indice].id === '') return ''
    	return `ID ${ingredientes[indice].id} / CAS ${ingredientes[indice].cas} / NOMBRE ${ingredientes[indice].nombre}`;
	}

	const renderValuePres = () => {
		if(presentaciones[indice].id === '') return ''
    	return `ID ${presentaciones[indice].id} /  $ ${presentaciones[indice].precio} / VOLUMEN ${presentaciones[indice].volumen}`;
	}


	return(
		<>
		<div className="ingrediente-wrapper">
		{/*<h6> Ingrediente {indice + 1}</h6>*/}
      	<FormControl className={classes.formControl}>
        <InputLabel id={`ingrediente-${indice}`}> Ingrediente </InputLabel>
	        <Select
	          labelId={`ingrediente-${indice}`}
	          id={`ingrediente-${indice}`}
	          label={ingredientes[indice].nombre}
	          renderValue={() => renderValue()}
	          value={'ingredientes[indice].nombre'}
	          onChange={value => handleChange(indice, value)}
	          placeholder={ingredientes[indice].nombre}
	          input={<Input value={'Hola'}/>}
	        >

	        {opciones.map((opcion,indiceOp) =>(
	        	<MenuItem value={indiceOp}> ID {opcion.id} / CAS {opcion.cas} / NOMBRE {opcion.nombre} </MenuItem>
	        ))}
        	</Select>
      	</FormControl>

      	{ingredientes[indice].presentaciones?(

      	<FormControl className={classes.formControl}>
        <InputLabel id={`presentacion-ing-${indice}`}>Presentacion </InputLabel>
	        <Select
	          labelId={`ingrediente-${indice}`}
	          id={`ingrediente-${indice}`}
	          value={ingredientes[indice]}
	          renderValue={() => renderValuePres()}
	          onChange={value => handleChangePres(indice, value)}
	        >
	        {ingredientes[indice].presentaciones.map((opcion,indOpPres) =>(
	        	<MenuItem value={indOpPres}> ID {opcion.id} /  $ {opcion.precio} / VOLUMEN {opcion.volumen} </MenuItem>
	        ))}
        	</Select>
      	</FormControl>
      	):null}

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