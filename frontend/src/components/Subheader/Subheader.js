import React from 'react';
import './subheader-styles.css'
import {Nav} from "tabler-react";
import { Link as DomLink } from 'react-router-dom'


const Subheader = ({subheaderLinks}) => (
	
	<Nav className="subheader-nav" style={ {backgroundColor:'white'}}>	
		{subheaderLinks.map( ({linkName,linkRef}) => (

			<DomLink
	          to={linkRef}
	          style={{
	            textDecoration: 'none',
	            color:'#9aa0ac'
	          }}>
			<Nav.Item className="subheader-nav-item">
			{linkName}
			</Nav.Item>
			</DomLink> 
			)
		)}
	</Nav>

)

export default Subheader