import React from 'react'

const InfoContrato = ({id,nombre,email,web}) => {
	return(
		<>
			<p> ID: {id} </p>
			<p> Nombre: {nombre} </p>
			<p> Web: {web} </p> 
			<p> Email: {email} </p>
		</>
	);
}

export default InfoContrato