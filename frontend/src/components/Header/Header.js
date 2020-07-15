import React from 'react';
import logo from '../../assets/logo.svg'
import './header-styles.css'
import {Nav} from "tabler-react";



const Header = () => (
	
	<Nav className="header-nav">	
		<Nav.Item>
			<div className="header-logo-wrapper">
				<img src={logo} alt="logo" className="header-logo"/>
			</div>
		</Nav.Item>
		<Nav className="header-links-wrapper">
			<Nav.Item>
				Evaluación
			</Nav.Item>
			<Nav.Item>
				Compras
			</Nav.Item>
			<Nav.Item>
				Recomendador
			</Nav.Item>
		</Nav>
	</Nav>

)

export default Header