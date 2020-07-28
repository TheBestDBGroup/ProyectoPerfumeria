import React from 'react';


const PalabraClave = (props) => {
	return (
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
	);
}

export default PalabraClave;