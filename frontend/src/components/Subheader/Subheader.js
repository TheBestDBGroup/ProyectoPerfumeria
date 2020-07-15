import React from 'react';
import './subheader-styles.css'
import {Nav} from "tabler-react";



const DummyHeaders = [
	{
		linkName: "Proveedores",
		linkRef: "/proveedores",
	},
	{
		linkName: "Clientes",
		linkRef: "/proveedores",
	},
	{
		linkName: "Perfumes",
		linkRef: "/proveedores",
	},
	{
		linkName: "Ingredientes",
		linkRef: "/proveedores",
	},
]

const Subheader = ({subheaderLinks = DummyHeaders}) => (
	
	<Nav className="subheader-nav" style={ {backgroundColor:'white'}}>	
		{subheaderLinks.map( ({linkName,linkRef}) => (
			<Nav.Item className="subheader-nav-item">
			{linkName}
			</Nav.Item>
			)
		)}
	</Nav>

)

export default Subheader