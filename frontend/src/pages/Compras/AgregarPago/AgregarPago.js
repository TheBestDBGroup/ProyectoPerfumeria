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
    id_condicion_pago:1,
    tipo_condicion_pago:'Contado',
    cuotas_condicion_pago:2,
    prctj_cuotas_condicion_pago:20,
    meses_cantidad_condicion_pago:2,
    id_cond_env_pago:1,
   },
   {  	
    id_condicion_pago:2,
    tipo_condicion_pago:'Crédito',
    cuotas_condicion_pago:3,
    prctj_cuotas_condicion_pago:30,
    mesescantidad_condicion_pago:2,
    id_cond_env_pago:1,
   },

 
]


const AgregarPago = (props) => {

	const id_pedido = props.match.params.idpedido
	const [pago,setPago] = useState([])
	const [opciones, setOpciones] = useState(DummyOpciones)
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
		alert('Ha creado su pedido con éxito')
		history.push(`/`)
	}

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

}

export default AgregarPago