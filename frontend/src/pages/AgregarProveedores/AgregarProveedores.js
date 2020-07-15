import React from 'react';
import './agregar-proveedores-styles.css';
import Subheader from '../../components/Subheader/Subheader'
import Sidebar from '../../components/Sidebar/Sidebar'





const ListaProveedores = ({sidebarLinks,subheaderLinks}) => (
	<>
	<Subheader subheaderLinks={subheaderLinks}/>
		<div className="main-content-wrapper">        
		    <Sidebar sidebarLinks={sidebarLinks}/>
	          <>
	          
		      </>
		</div>
	</>
)


export default ListaProveedores