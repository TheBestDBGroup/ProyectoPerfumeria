import React,{useState,useEffect} from 'react';
import{FormControl,Select,MenuItem,InputLabel,Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import axios from 'axios'



const useStyles = makeStyles((theme) => ({
	  formControl: {
	    margin: theme.spacing(1),
	    minWidth: 250,
	  },
	  selectEmpty: {
	    marginTop: theme.spacing(2),
	  },
}));




const AgregarPago = (props) => {

	const id_pedido = props.match.params.idpedido
	const id_proveedor = props.match.params.idproveedor
	const id_contrato = props.match.params.idcontrato
	const [pago,setPago] = useState([])
	const [opciones, setOpciones] = useState(undefined)
	const history = useHistory();
	const classes = useStyles();



	const renderValue = () => {
		
    	if(pago.tipo_condicion_pago === 'Contado'){
    	return `ID ${pago.id_condicion_pago} / TIPO ${pago.tipo_condicion_pago} /`;
		} 

		return `ID ${pago.id_condicion_pago} / TIPO ${pago.tipo_condicion_pago} / ${pago.cuotas_condicion_pago} cuotas de ${pago.prctj_cuotas_condicion_pago}% cada ${pago.mesescantidad_condicion_pago} mese(s)`

	}

	const handleChange = (event) => {
		setPago(event.target.value)
	} 

	const handleSubmit = () => {
		
		axios.post('/update/guardar-condicion-pago/cond-env-pago', {
			    id_pedido: id_pedido,
			    id_cond_env_pago:pago.id_cond_env_pago
			  })
			  .then((res) =>{
			    console.log('response guardar alt pago', res.data);
			    alert('Ha creado su pedido con éxito')
	            history.push(`/compras`)
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
	}

	useEffect(() => {

		axios.post('/read/contrato/condiciones-pago-contrato', {
		    id_proveedor: id_proveedor,
		    id_contrato:id_contrato
		  })
		  .then((res) =>{
		    console.log('response alt pagos', res.data);
            setOpciones(res.data);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	     
	}, []);

	if(opciones) {

	return(
		<>
		<div className="wrapper">
			<div className="center">
				<h4> Seleccione opción de Pago</h4>
			</div>
			
			<div className="center">
	      	<FormControl className={classes.formControl}>
		        <InputLabel> Opción de Pago </InputLabel>
			        <Select
			          renderValue={() => renderValue()}
			          value={pago.id_condicion_pago}
			          onChange={value => handleChange(value)}
			        >

			        {opciones.map((val,indiceOp) =>(
			        	<MenuItem value={val}> {`ID ${val.id_condicion_pago} / TIPO ${val.tipo_condicion_pago}  ${val.tipo_condicion_pago==='Crédito'? (`${val.cuotas_condicion_pago} cuotas de ${val.prctj_cuotas_condicion_pago}% cada ${val.mesescantidad_condicion_pago} mese(s)`):''}`}</MenuItem>
			        ))}

		        	</Select>
		      	</FormControl>
		    </div>
	      	
	      	<div className="center">
		      	<Button variant="outlined" size="small" onClick={handleSubmit}>
					Finalizar
				</Button>	
			</div>
		</div>
      	</>
    )

	} else {
		return <p> Cargando ... </p>
	}

}

export default AgregarPago