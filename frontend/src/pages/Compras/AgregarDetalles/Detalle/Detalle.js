import React from 'react'
import{FormControl,Select,MenuItem,InputLabel,Input,IconButton,InputAdornment,TextField} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import './detalle-styles.css';


const useStyles = makeStyles((theme) => ({
	  formControl: {
	    margin: theme.spacing(1),
	    minWidth: 250,
	  },
	  selectEmpty: {
	    marginTop: theme.spacing(2),
	  },
}));



const Detalle = ({indice,handleChange,opciones,detalles,handleDelete,handleCantidadDetalle}) => {
	const classes = useStyles();

	if(detalles && detalles.length>0 && detalles[indice]) {

	const renderValue = () => {
		let val = detalles[indice]
		if(val.id === '') {return ''}
    	return `NOMBRE: ${val.nombre} CAS: ${val.cas} PRECIO: ${val.precio_presentacion} VOLUMEN ${val.volumen_presentacion}ml`;
	}



	return(
		<>
		<div className="criterio-wrapper">
      	<FormControl className={classes.formControl}>
        <InputLabel id={`criterio-${indice}`}> Detalle Pedido </InputLabel>
	        <Select
	          renderValue={() => renderValue()}
	          value={detalles[indice].id}
	          onChange={value => handleChange(indice, value)}
	        >

	        {opciones.map((val,indiceOp) =>(
	        	<MenuItem value={indiceOp}> {`NOMBRE: ${val.nombre} CAS: ${val.cas} PRECIO: ${val.precio_presentacion} VOLUMEN ${val.volumen_presentacion}ml`}</MenuItem>
	        ))}

        	</Select>
      	</FormControl>

      	
      	{detalles[indice].id===''? null:
      		(<div className="peso-label">
	      		<Input 
	      			label="Cantidad" 
	      			className="criterio-peso-input" 
	      			placeholder="Cantidad" 
	      			value={detalles[indice].cantidad} 
	      			onChange={(e) => handleCantidadDetalle(indice,e)}
	      		/>
	      	</div>
      		)
      	}
      	<IconButton aria-label="delete" className="criterio-delete-icon" onClick={(e) => handleDelete(indice)}>
        	<DeleteIcon />
      	</IconButton>

      	</div>
		</>
	)
	}
	else {
		return <> </>
	}

}

export default Detalle