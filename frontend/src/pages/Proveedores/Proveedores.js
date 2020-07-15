import React from 'react';
import './proveedores-styles.css';
import Subheader from '../../components/Subheader/Subheader'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Route, Switch, BrowserRouter} from 'react-router-dom'



const Proveedores = ({subheaderLinks, sidebarLinks}) => (
	<>
	<Subheader subheaderLinks={subheaderLinks}/>
		<div className="main-content-wrapper">        
		    <Sidebar sidebarLinks={sidebarLinks}/>
	          <>
	          
		      </>
		</div>
	</>
)


export default Proveedores