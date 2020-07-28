import React, {useState} from 'react'
import Carousel from 'nice-react-carousel';
import CardPerfume from '../CardPerfume/CardPerfume'
import {Radio,
		RadioGroup,
		FormControlLabel,
		FormControl,
		FormLabel,
		Checkbox,
		FormGroup,
		FormHelperText,
		Select,
		MenuItem,
		InputLabel,
		IconButton,
		Button,
		} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import './recomendador-styles.css'
import PalabraClave from '../PalabraClave/PalabraClave'

///BORRAR
//Genero: Hombre/Mujer/Unisex
//Edad: Adulto/Atemporal/Juvenil
//Intensidad: Ligero/Intermedio/Intenso
	
	//,'Carácter','Personalidad','Preferencia Uso']

const dummyOpPC = {aroma:[
{
	nombre_palabra_clave: 'Prueba op Aroma 0'
},
{
	nombre_palabra_clave: 'Prueba op Aroma 1'
},
{
	nombre_palabra_clave: 'Prueba op Aroma 2'
},
{
	nombre_palabra_clave: 'Prueba op Aroma 3'
},
{
	nombre_palabra_clave:'Prueba op Aroma 4'
}
],caracter:[{
	nombre_palabra_clave: 'Prueba op Caracter 0'
},
{
	nombre_palabra_clave: 'Prueba op Caracter 1'
},
{
	nombre_palabra_clave: 'Prueba op Caracter 2'
},
{
	nombre_palabra_clave: 'Prueba op Caracter 3'
},
{
	nombre_palabra_clave:'Prueba op Caracter 4'
}
],personalidad:[
{
	nombre_palabra_clave: 'Prueba op Personalidad 0'
},
{
	nombre_palabra_clave: 'Prueba op Personalidad 1'
},
{
	nombre_palabra_clave: 'Prueba op Personalidad 2'
},
{
	nombre_palabra_clave: 'Prueba op Personalidad 3'
},
{
	nombre_palabra_clave:'Prueba op Personalidad 4'
}
],
prefuso:[
{
	nombre_palabra_clave: 'Prueba op Pref Uso 0'
},
{
	nombre_palabra_clave: 'Prueba op Pref Uso 1'
},
{
	nombre_palabra_clave: 'Prueba op Pref Uso 2'
},
{
	nombre_palabra_clave: 'Prueba op Pref Uso 3'
},
{
	nombre_palabra_clave:'Prueba op Pref Uso 4'
}
],
}



////////////NO BORRAR////////////////////////////////////////////////////////////

// Mandar familias Olfativas

const initFamiliasOlfativas = {
	Verde:false,
	Citrico:false, //Cítrico
	Flores:false,
	Frutas:false,
	Aromaticos:false, //Aromáticos
	Helechos:false,
	Chipre:false,
	Maderas:false,
	Orientales:false,
	Otros:false,
}

const initOpcionesCategoriaPC =[
{cat:'Aroma', obj:'aroma'}, 
{cat:'Carácter',obj:'caracter'},
{cat:'Personalidad', obj:'personalidad'},
{cat:'Preferencia Uso', obj:'prefuso'},
]


const useStyles = makeStyles((theme) => ({
  root: {
   // display: 'flex',
  },
  formControl: {
    margin: theme.spacing(1),
  },
  formControlLabel:{
  	display:'inline-block'
  },
  formGroup:{
  	flexDirection:'row'
  }
}));




const Recomendador =() => {

	const [genero, setGenero] = useState('Hombre')
	const [edad, setEdad] = useState('Adulto')
	const [intensidad,setIntensidad] = useState('Ligero')
	const [palabrasClave,setPalabrasClave] = useState([])
	const [familiasOlfativas, setFamiliasOlfativas] = useState(initFamiliasOlfativas)
	const opcionesCategoriaPC = initOpcionesCategoriaPC
	const [opcionesPC,setOpcionesPC] = useState(dummyOpPC)
	const classes = useStyles();


	const handleChangeGenero = (event) => {
	    setGenero(event.target.value);
	};
	const handleChangeEdad = (event) => {
	    setEdad(event.target.value);
	};
	const handleChangeIntensidad = (event) => {
	    setIntensidad(event.target.value);
	};

	const handleChangeFO = (event) => {
    	setFamiliasOlfativas({ ...familiasOlfativas, [event.target.name]: event.target.checked });
  	};


	const agregarPalabraClave = () => {
		let palabrasClaveCopy= [...palabrasClave]
		palabrasClaveCopy.push({cat:'',obj:'',sel:''}) //cat: nombre cat como en la base, //obj como lo tengo en el obj opcion //sel:palabra que elegi
		setPalabrasClave( palabrasClaveCopy)				
	}

	const borrarPalabraClave = (indice) => {
		let palabrasClaveCopy= [...palabrasClave]
		palabrasClaveCopy.splice(indice,1)
		setPalabrasClave(palabrasClaveCopy) 
	}


	const handleChangePC = (indice,e) => {
		let palabrasClaveCopy = [...palabrasClave]
		//let cantidad = detalleCopy[indice].cantidad
		palabrasClaveCopy[indice] = opcionesCategoriaPC[e.target.value]
		//detalleCopy[indice].cantidad = cantidad
		setPalabrasClave(palabrasClaveCopy) 
	}

	/*const handleCantidadDetalle =(indice, e) => {
		let detalleCopy =[...detalles]
		detalleCopy[indice].cantidad = e.target.value
		setDetalles(detalleCopy)
	}*/

	
	return (
		<>
		{console.log('Genero', genero)}
		{console.log('familiasOlfativas', familiasOlfativas)}
		{console.log('Palabras Clave',palabrasClave)}


		<Carousel mode="normal" itemsBySlide={3} itemsToShow={3} dots>
		  <CardPerfume/>
		  <CardPerfume/>
		  <CardPerfume/>
		  <CardPerfume/>
		  <CardPerfume/>
		  <CardPerfume/>
		  <CardPerfume/>
		  <CardPerfume/>
		  <CardPerfume/>
		</Carousel>

		<div className="merge">
		<div className="position-wrapper">
		<div className="radio-button-group-wrapper">
		<FormControl component="fieldset" className="prueba">
	      <FormLabel component="legend">Género</FormLabel>
	      <RadioGroup aria-label="genero" name="genero" value={genero} onChange={handleChangeGenero}>
	        <FormControlLabel value="Hombre" control={<Radio />} label="Hombre" />
	        <FormControlLabel value="Mujer" control={<Radio />} label="Mujer" />
	        <FormControlLabel value="Unisex" control={<Radio />} label="Unisex" />
	      </RadioGroup>
	    </FormControl>

	    <FormControl component="fieldset">
	      <FormLabel component="legend">Edad</FormLabel>
	      <RadioGroup aria-label="edad" name="edad" value={edad} onChange={handleChangeEdad}>
	        <FormControlLabel value="Adulto" control={<Radio />} label="Adulto" />
	        <FormControlLabel value="Atemporal" control={<Radio />} label="Atemporal" />
	        <FormControlLabel value="Joven" control={<Radio />} label="Joven" />
	      </RadioGroup>
	    </FormControl>

	    <FormControl component="fieldset">
	      <FormLabel component="legend">Intensidad</FormLabel>
	      <RadioGroup aria-label="edad" name="edad" value={edad} onChange={handleChangeEdad}>
	        <FormControlLabel value="Ligero" control={<Radio />} label="Ligero/Medio" />
	        <FormControlLabel value="Intermedio" control={<Radio />} label="Intermedio" />
	        <FormControlLabel value="Intenso" control={<Radio />} label="Intenso/Profundo"/>
	      </RadioGroup>
	    </FormControl>
	    </div>
	    </div>



	    <FormControl component="fieldset" className={classes.formControl} style={{marginTop:'20px',maxWidth:'400px'}}>
	        <FormLabel component="legend"> Familias Olfativas</FormLabel>
	        <FormGroup style={{flexDirection:'row'}}>

	          <FormControlLabel
	            control={<Checkbox checked={familiasOlfativas.Verde} onChange={handleChangeFO} name="Verde" />}
	            label="Verde"
	            className={classes.formControlLabel}
	          />
	          <FormControlLabel
	            control={<Checkbox checked={familiasOlfativas.Citrico} onChange={handleChangeFO} name="Citrico" />}
	            label="Cítrico"
	          />
	          <FormControlLabel
	            control={<Checkbox checked={familiasOlfativas.Flores} onChange={handleChangeFO} name="Flores" />}
	            label="Flores"
	          />
	          <FormControlLabel
	            control={<Checkbox checked={familiasOlfativas.Frutas} onChange={handleChangeFO} name="Frutas" />}
	            label="Frutas"
	          />
	          <FormControlLabel
	            control={<Checkbox checked={familiasOlfativas.Aromaticos} onChange={handleChangeFO} name="Aromaticos" />}
	            label="Aromáticos"
	          />
	          <FormControlLabel
	            control={<Checkbox checked={familiasOlfativas.Helechos} onChange={handleChangeFO} name="Helechos" />}
	            label="Helechos"
	          />
	          <FormControlLabel
	            control={<Checkbox checked={familiasOlfativas.Chipre} onChange={handleChangeFO} name="Chipre" />}
	            label="Chipre"
	          />
	          <FormControlLabel
	            control={<Checkbox checked={familiasOlfativas.Maderas} onChange={handleChangeFO} name="Maderas" />}
	            label="Maderas"
	          />
	          <FormControlLabel
	            control={<Checkbox checked={familiasOlfativas.Orientales} onChange={handleChangeFO} name="Orientales" />}
	            label="Orientales"
	          />
	          <FormControlLabel
	            control={<Checkbox checked={familiasOlfativas.Otros} onChange={handleChangeFO} name="Otros" />}
	            label="Otros"
	          />
	        </FormGroup>
	     </FormControl>
	     </div>

	     	<div>
			<Button variant="outlined" size="small" onClick={agregarPalabraClave}>
			  + Agregar 
			</Button>
			</div>


			{palabrasClave.map((palabraClave,indice) => (
				<PalabraClave 
					opCategoriaPC={opcionesCategoriaPC}
					handleChangeOpCatPc={handleChangePC}
					opcionesPC={opcionesPC}
					indice={indice}
					palabraClave={palabraClave}
					handleDelete={borrarPalabraClave}

				/>
				))
			}

		</>
	)
}

export default Recomendador