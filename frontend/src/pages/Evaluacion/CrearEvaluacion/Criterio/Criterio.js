import React from 'react'
import{FormControl,Select,MenuItem,InputLabel,Input,IconButton,InputAdornment,TextField} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import './criterio-styles.css';


const useStyles = makeStyles((theme) => ({
	  formControl: {
	    margin: theme.spacing(1),
	    minWidth: 400,
	  },
	  selectEmpty: {
	    marginTop: theme.spacing(2),
	  },
}));


const Criterio = ({indice,handleChange,opciones,criterios,handleDelete,handlePesoCriterio}) => {
	const classes = useStyles();

	if(criterios && criterios.length>0 && criterios[indice]) {

	const renderValue = () => {
		if(criterios[indice].id === '') {return ''}
    	return `${criterios[indice].tipo_criterio_evaluacion}`;
	}



	return(
		<>
		<div className="criterio-wrapper">
      	<FormControl className={classes.formControl}>
        <InputLabel id={`criterio-${indice}`}> Criterio </InputLabel>
	        <Select
	          renderValue={() => renderValue()}
	          value={criterios[indice]}
	          onChange={value => handleChange(indice, value)}
	        >

	        {opciones.map((opcion,indiceOp) =>(
	        	<MenuItem value={indiceOp}> {opcion.tipo_criterio_evaluacion}</MenuItem>
	        ))}
        	</Select>
      	</FormControl>

      	
      	{criterios[indice].id===''? null:
      		(<Input label="Peso" className="criterio-peso-input" placeholder="Peso" endAdornment={<InputAdornment position="end">%</InputAdornment>} value={criterios[indice].peso_prctj__eval_crit} onChange={(e) => handlePesoCriterio(indice,e)}/>)
      	}
      	<IconButton aria-label="delete" className="criterio-delete-icon" onClick={(e) => handleDelete(indice)}>
        	<DeleteIcon />
      	</IconButton>

      	</div>

      	<h6> Descripción </h6>
      	<p> {criterios[indice].descripcion_criterio_evaluacion}</p>
		</>
	)
	}
	else {
		return <> </>
	}

}

export default Criterio