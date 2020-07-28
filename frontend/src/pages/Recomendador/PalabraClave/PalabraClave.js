import React from 'react';
import {
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

const PalabraClave = ({opCategoriaPC, handleChangeOpCatPc,palabraClave,opcionesPC, indice, handleDelete}) => {
	
	const classes = useStyles();

	const renderValueOpCategoriaPC = () => {
    	return `${palabraClave.cat}`;
	}



	return (
		<>
		  <div>
		    
		  	<FormControl className={classes.formControl}>

		        <InputLabel id="demo-simple-select-label">Palabra Clave</InputLabel>
		        <Select
		          labelId="demo-simple-select-label"
		          id="demo-simple-select"
		          value={palabraClave}
		          className="rec-select"
		          renderValue={()=>renderValueOpCategoriaPC()}
		          onChange={e => handleChangeOpCatPc(indice,e)}
		        >

		        {opCategoriaPC.map((opCat,indice) =>(
		          <MenuItem value={indice}> {opCat.cat}</MenuItem>
		        ))}
		        
		        </Select>
		      </FormControl>

		      {/*<FormControl className={classes.formControl}>
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
		      </FormControl>*/}

		      <IconButton aria-label="delete" className="pc-delete-icon" onClick={e => handleDelete(indice)}>
	        	<DeleteIcon />
	      	  </IconButton>

	     </div>
	 </>
	);
}

export default PalabraClave;