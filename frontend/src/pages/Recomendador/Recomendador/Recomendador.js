import React, {useState,useEffect} from 'react'
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
import axios from 'axios'
import _ from 'lodash';



////////////NO BORRAR////////////////////////////////////////////////////////////

// Mandar familias Olfativas

const initFamiliasOlfativas = {
	verde:false,
	citrico:false, //Cítrico
	flores:false,
	frutas:false,
	aromaticos:false, //Aromáticos
	helechos:false,
	chipre:false,
	maderas:false,
	orientales:false,
	otros:false,
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

const catObj = {
	aroma:'Aroma',
	caracter:'Carácter',
	personalidad:'Personalidad',
	prefuso:'Preferencia Uso'
}



const parseFamiliaOlfativa = {
	verde:'Verde',
	citrico:'Cítrico', //Cítrico
	flores:'Flores',
	frutas:'Frutas',
	aromaticos:'Aromáticos', //Aromáticos
	helechos:'Helechos',
	chipre:'Chipre',
	maderas:'Maderas',
	orientales:'Orientales',
	otros:'Otros',
}

const getCat = (obj) => {
	return catObj[obj]
}


const optQueries = ['Aroma','Carácter','Personalidad','Preferencia Uso']





const Recomendador =() => {

	const [genero, setGenero] = useState('Hombre')
	const [edad, setEdad] = useState('Adulto')
	const [intensidad,setIntensidad] = useState('Ligero')
	const [palabrasClave,setPalabrasClave] = useState([])
	const [familiasOlfativas, setFamiliasOlfativas] = useState(initFamiliasOlfativas)
	const opcionesCategoriaPC = initOpcionesCategoriaPC
	const [opcionesPC,setOpcionesPC] = useState(undefined)
	const [perfumes,setPerfumes] = useState(undefined)
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
		palabrasClaveCopy[indice] = opcionesCategoriaPC[e.target.value]
		palabrasClaveCopy[indice].sel =''
		setPalabrasClave(palabrasClaveCopy) 
	}

	/*const handleCantidadDetalle =(indice, e) => {
		let detalleCopy =[...detalles]
		detalleCopy[indice].cantidad = e.target.value
		setDetalles(detalleCopy)
	}*/

	const getQueryFamiliaOlfativa = (famOlf)=> {

		let objQuery = {}

		for (let [key, value] of Object.entries(famOlf)) {
		  
		  	if(value) {
		  		objQuery[key] = parseFamiliaOlfativa[key]
		  	}
		}

		return objQuery

	}

	const getQueryIntensidad = (inten) =>{
		if(inten == 'Ligero'){
			return '{Splash perfume,Eau de cologne}'
		} else if (inten === 'Intermedio'){
			return '{Eau de toilette}'
		} else {
			return '{Perfume,Eau de perfume}'
		}
	} 

	const parsearPalabraClaveCaracter = (palClave) =>{


		let caracteres = palClave.filter(pal =>{
			if(pal.obj=='caracter'){
				return pal.sel
			}
		})

		caracteres = caracteres.map(caracter => caracter.sel)

		caracteres = caracteres.join(',')

		caracteres ='{'+caracteres+'}'

		return caracteres

	}

	const handleChangePalabraClave = (indice,e) => {
		console.log('e target value',e.target.value)
		let palabrasClaveCopy = [...palabrasClave]
		let seleccion = opcionesPC[e.target.value.opCategoria][e.target.value.indiceOpPC].nombre_palabra_clave
		let obj = e.target.value.opCategoria
		let cat = getCat(e.target.value.opCategoria)
		palabrasClaveCopy[indice] = {cat:cat,obj:obj,sel:seleccion}	
		setPalabrasClave(palabrasClaveCopy)
	}


	const deleteRepetidos= (arrayProv)=>{


		let uniqueIDs = {};
		let uniquePerfumes =[]

		arrayProv.map(perfume => {
			
			if(uniqueIDs.hasOwnProperty(perfume.id_perfume)){

				uniquePerfumes.forEach(per => {
					if(per.id_perfume === perfume.id_perfume){
						per.ocurrencia = parseInt(per.ocurrencia) + parseInt(perfume.ocurrencia)
					}

				})
			}

			else {
				uniqueIDs[perfume.id_perfume] = perfume.id_perfume
				uniquePerfumes.push(perfume)
			}
		})

		let sortedObjs = _.reverse(_.sortBy(uniquePerfumes, ['ocurrencia']));

		sortedObjs = sortedObjs.splice(0,9)
		
		return sortedObjs

	}




	useEffect(() => {

		let promesas = []

		optQueries.forEach(opt =>

			promesas.push(
			  axios.post('/read/recomendador/op-tipo-palabra-clave', {
			    tipo: opt
			  })
			)
		)     	

		Promise.all(promesas)
		 .then(function (res) {
		    console.log('response promise all', res)
		    setOpcionesPC({aroma: res[0].data,caracter:res[1].data,personalidad:res[2].data,prefuso:res[3].data})
		  
		 });	
	     
	}, []);


	useEffect(() => {

		setPerfumes(undefined)

		let query = getQueryFamiliaOlfativa(familiasOlfativas)

		query.genero = genero

		query.edad = edad

		query.intensidad = getQueryIntensidad(intensidad)

		let caracter = parsearPalabraClaveCaracter(palabrasClave)

		if(caracter.length >0){
			query.caracter = caracter
		}

	
		axios.post('/read/perfumes-recomendador', query)
		  .then((res) =>{
		    console.log('response recomendador', res.data);
		    setPerfumes(deleteRepetidos(res.data))
           
		  })
		  .catch(function (error) {
		    console.log(error);
		  });

		  
	     
	}, [palabrasClave,edad,genero,intensidad,familiasOlfativas]);


	if(opcionesPC){
	
	return (
		<>
		{console.log('Genero', genero)}
		{console.log('familiasOlfativas', familiasOlfativas)}
		{console.log('Palabras Clave',palabrasClave)}
		{console.log('intensidad', intensidad)}
		{console.log('edad', edad)}
		{console.log('perfumes', perfumes)}
	
		


		{ perfumes === undefined? (<p> "Cargando..."</p>): 
		(<Carousel mode="normal" itemsBySlide={3} itemsToShow={3} dots>
			{perfumes.map(perfume =>(
		  		<CardPerfume perfume={perfume}/>
		  	))}
		</Carousel>)
		}

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
	      <RadioGroup aria-label="edad" name="edad" value={intensidad} onChange={handleChangeIntensidad}>
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
	            control={<Checkbox checked={familiasOlfativas.verde} onChange={handleChangeFO} name="verde" />}
	            label="Verde"
	            className={classes.formControlLabel}
	          />
	          <FormControlLabel
	            control={<Checkbox checked={familiasOlfativas.citrico} onChange={handleChangeFO} name="citrico" />}
	            label="Cítrico"
	          />
	          <FormControlLabel
	            control={<Checkbox checked={familiasOlfativas.flores} onChange={handleChangeFO} name="flores" />}
	            label="Flores"
	          />
	          <FormControlLabel
	            control={<Checkbox checked={familiasOlfativas.frutas} onChange={handleChangeFO} name="frutas" />}
	            label="Frutas"
	          />
	          <FormControlLabel
	            control={<Checkbox checked={familiasOlfativas.aromaticos} onChange={handleChangeFO} name="aromaticos" />}
	            label="Aromáticos"
	          />
	          <FormControlLabel
	            control={<Checkbox checked={familiasOlfativas.helechos} onChange={handleChangeFO} name="helechos" />}
	            label="Helechos"
	          />
	          <FormControlLabel
	            control={<Checkbox checked={familiasOlfativas.chipre} onChange={handleChangeFO} name="chipre" />}
	            label="Chipre"
	          />
	          <FormControlLabel
	            control={<Checkbox checked={familiasOlfativas.maderas} onChange={handleChangeFO} name="maderas" />}
	            label="Maderas"
	          />
	          <FormControlLabel
	            control={<Checkbox checked={familiasOlfativas.orientales} onChange={handleChangeFO} name="orientales" />}
	            label="Orientales"
	          />
	          <FormControlLabel
	            control={<Checkbox checked={familiasOlfativas.otros} onChange={handleChangeFO} name="otros" />}
	            label="Otros"
	          />
	        </FormGroup>
	     </FormControl>
	     </div>



	     	<div>
			<Button variant="outlined" size="small" onClick={agregarPalabraClave}>
			  + Agregar 
			</Button>
			


			{palabrasClave.map((palabraClave,indice) => (
				<PalabraClave 
					opCategoriaPC={opcionesCategoriaPC}
					handleChangeOpCatPc={handleChangePC}
					opcionesPC={opcionesPC}
					indice={indice}
					palabraClave={palabraClave}
					handleDelete={borrarPalabraClave}
					handleChangePalabraClave={handleChangePalabraClave}

				/>
				))
			}

			</div>

		</>
	)
	} else {
		return <p> Cargando... </p>
	}
}

export default Recomendador