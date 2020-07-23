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


const Pago = ({indice,handleChange,opciones,pagos,handleDelete}) => {
	const classes = useStyles();

	if(pagos && pagos.length>0 && pagos[indice]) {

	const renderValue = () => {
		if(pagos[indice].id === '') return ''

		if(pagos[indice].tipo_condicion_pago === 'Contado'){
    	return `ID ${pagos[indice].id_condicion_pago} / TIPO ${pagos[indice].tipo_condicion_pago} /`;
		} 

		return `ID ${pagos[indice].id_condicion_pago} / TIPO ${pagos[indice].tipo_condicion_pago} / ${pagos[indice].cuotas_condicion_pago} cuotas de ${pagos[indice].cuotas_condicion_pago}% cada ${pagos[indice].mesescantidad_condicion_pago} mese(s)`
	}	



	return(
		<>
		<div className="envio-wrapper">
		{/*<h6> Ingrediente {indice + 1}</h6>*/}
      	<FormControl className={classes.formControl}>
        <InputLabel id={`pago-${indice}`}> Opcion Pago </InputLabel>
	        <Select
	          renderValue={() => renderValue()}
	          value={pagos[indice].id_alt_envio}
	          onChange={value => handleChange(indice, value)}
	        >

	        {opciones.map((opcion,indiceOp) =>(
	        	<MenuItem value={indiceOp}> 
	        	{`ID ${opcion.id_condicion_pago} / TIPO ${opcion.tipo_condicion_pago}` } 
	        	{opcion.tipo_condicion_pago === 'Contado'?(''):(` / ${opcion.cuotas_condicion_pago} cuotas de ${opcion.cuotas_condicion_pago}% cada ${opcion.mesescantidad_condicion_pago} mese(s)`)}</MenuItem>
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

export default Pago