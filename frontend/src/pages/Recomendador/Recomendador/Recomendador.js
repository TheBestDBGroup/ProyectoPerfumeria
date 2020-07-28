import React, {useState} from 'react'
import Carousel from 'nice-react-carousel';
import Sidebar from '../Sidebar/Sidebar'
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


//Genero: Hombre/Mujer/Unisex
//Edad: Adulto/Atemporal/Juvenil
//Intensidad: Ligero/Intermedio/Intenso


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
	const [familiasOlfativas, setFamiliasOlfativas]= useState(initFamiliasOlfativas)
	const classes = useStyles();

	const [age, setAge] = React.useState('');

	  const handleChange = (event) => {
	    setAge(event.target.value);
	  };

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

	
	return (
		<>
		{console.log('Genero', genero)}
		{console.log('familiasOlfativas', familiasOlfativas)}


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


		
	    <div>
		    <div>
			<Button variant="outlined" size="small">
			  + Agregar 
			</Button>
			</div>
		  	<FormControl className={classes.formControl}>

		        <InputLabel id="demo-simple-select-label">Palabra Clave</InputLabel>
		        <Select
		          labelId="demo-simple-select-label"
		          id="demo-simple-select"
		          value={age}
		          className="rec-select"
		          onChange={handleChange}
		        >
		          <MenuItem value={10}>Ten</MenuItem>
		          <MenuItem value={20}>Twenty</MenuItem>
		          <MenuItem value={30}>Thirty</MenuItem>
		        </Select>
		      </FormControl>

		      <FormControl className={classes.formControl}>
		        <InputLabel id="demo-simple-select-label"></InputLabel>
		        <Select
		          labelId="demo-simple-select-label"
		          id="demo-simple-select"
		          value={age}
		          className="rec-select"
		          onChange={handleChange}
		        >
		          <MenuItem value={10}>Ten</MenuItem>
		          <MenuItem value={20}>Twenty</MenuItem>
		          <MenuItem value={30}>Thirty</MenuItem>
		        </Select>
		      </FormControl>

		      <IconButton aria-label="delete" className="pc-delete-icon" >
	        	<DeleteIcon />
	      	  </IconButton>

	     </div>
	 </div>


	     


		</>
	)
}

export default Recomendador