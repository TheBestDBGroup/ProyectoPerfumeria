import React,{useState} from 'react';
import './nuevo-contrato-styles.css';
import Ingrediente from './Ingrediente/Ingrediente'
import {Button,IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';



const DummyIngredientes = [	
	{
		id: 1,
		cas: '12345',
		nombre: 'Vainilla Sensual',
		presentaciones:[ 
			{precio:20, volumen:'20ml', id:1},
			{precio:40, volumen:'40ml', id:2},
			{precio:50, volumen:'30ml', id:3},
		]
	},
	{
		id: 2,
		cas: '12345',
		nombre: 'Chocolate',
		presentaciones:[ 
			{precio:20, volumen:'20ml',id:4},
			{precio:40, volumen:'40ml',id:5},
			{precio:50, volumen:'30ml',id:6},
		]
	},
	{
		id: 2,
		cas: '12345',
		nombre: 'Canela Pasion',
		presentaciones:[ 
			{precio:20, volumen:'20ml',id:7},
			{precio:40, volumen:'40ml',id:8},
			{precio:50, volumen:'30ml',id:9},
		]
	},
];




const NuevoContrato = (props) => {

const productorId = localStorage.getItem('id_productor');
const proveedorId = props.match.params.idproveedor

const [opcionesIngredientes, setOpcionesIngredientes] = useState(DummyIngredientes) //volver estado


const [ingredientes,setIngredientes] = useState([{nombre:'', id:'', cas:''}])
const [presentaciones,setPresentaciones] = useState([{precio:'', volumen:'', id:''}])


const handleChangeIngredientes = (indice, e) => {
	//change ingrediente
	let ingredientesCopy = [...ingredientes]
	ingredientesCopy[indice] = opcionesIngredientes[e.target.value]
	
	//reset presentaciones
	let presentacionesCopy = [...presentaciones]
	presentacionesCopy[indice] = {precio:'', volumen:'', id:''}

	setPresentaciones(presentacionesCopy)
	setIngredientes(ingredientesCopy)
}

const handleChangePres = (indice, e) => {
	let presentacionesCopy = [...presentaciones]
	presentacionesCopy[indice] = ingredientes[indice].presentaciones[e.target.value]
	setPresentaciones(presentacionesCopy)
}

const agregarIngrediente = () => {
	
	let ingredientesCopy = [...ingredientes]
	let presentacionesCopy = [...presentaciones]

	ingredientesCopy.push({nombre:'', id:'', cas:''})
	presentacionesCopy.push({precio:'', volumen:'', id:''})

	setIngredientes(ingredientesCopy)
	setPresentaciones(presentacionesCopy)

}

const borrarIngrediente = (indice) => {
	const ingredientesCopy = [...ingredientes]
	const presentacionesCopy = [...presentaciones]
    ingredientesCopy.splice(indice,1)
    presentacionesCopy.splice(indice,1)
    setIngredientes(ingredientesCopy)
    setPresentaciones(presentacionesCopy)
}


return (
		<>
		
		<h1 className="nuevo-contrato-titulo"> Nuevo Contrato</h1>
		<div className="nuevo-contrato-content">

			<div className="nuevo-contrato-subtitle-wrapper">
			<h3 className="nuevo-contrato-subtitle"> Ingredientes</h3>
			<Button variant="outlined" size="small" onClick={agregarIngrediente}>
			  + Nuevo
			</Button>
        	</div>

			{console.log('ingredientes',ingredientes)}
			{ingredientes.map((ingrediente,indice) => (
				<Ingrediente 
					key={indice} 
					indice={indice} 
					handleChangePres={handleChangePres}
					handleChange={handleChangeIngredientes} 
					ingredientes={ingredientes} 
					presentaciones={presentaciones} 
					opciones={opcionesIngredientes}
					handleDelete={borrarIngrediente}
				/>
			))}
		</div>
		</>
)}


export default NuevoContrato