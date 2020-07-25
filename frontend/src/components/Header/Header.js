import React from 'react';
import logo from '../../assets/logo.svg'
import './header-styles.css'
import {Nav} from "tabler-react";
import { Link as DomLink } from 'react-router-dom'


const Header = () => (
	
	<Nav className="header-nav">
		
		<Nav.Item>
		<DomLink
		        to={`/`}
		        style={{
		        textDecoration: 'none',
		        color:'#9aa0ac'
		    }}>	
			<div className="header-logo-wrapper">
				<img src={logo} alt="logo" className="header-logo"/>
			</div>
		</DomLink> 
		</Nav.Item>
		

		
		<Nav className="header-links-wrapper">
			
			<DomLink
		        to={`/evaluacion`}
		        style={{
		        textDecoration: 'none',
		        color:'#9aa0ac'
		    }}>
				<Nav.Item>
					Evaluación
				</Nav.Item>
			</DomLink> 
			<DomLink
		        to={`/compras`}
		        style={{
		        textDecoration: 'none',
		        color:'#9aa0ac'
		    }}>
				<Nav.Item>
					Compras
				</Nav.Item>
			</DomLink> 
			<DomLink
		        to={`/recomendador`}
		        style={{
		        textDecoration: 'none',
		        color:'#9aa0ac'
		    }}>
				<Nav.Item>
					Recomendador
				</Nav.Item>
			</DomLink> 
		</Nav>
	</Nav>

)

export default Header