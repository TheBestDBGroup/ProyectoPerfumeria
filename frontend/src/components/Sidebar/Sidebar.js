import React from 'react';
import {List} from "tabler-react";
import './sidebar-styles.css';


const Sidebar = () => {
	return (
		<div className="sidebar-wrapper">
		<List className="sidebar-nav">
			<List.Group className="sidebar-nav-listgroup">
				<List.GroupItem action icon="globe">
				   Listar Proveedores
				 </List.GroupItem>
				  <List.GroupItem action icon="globe">
				    Agregar proveedor
				  </List.GroupItem>
				  <List.GroupItem action icon="globe">
				    Eliminar Proveedor
				  </List.GroupItem>
				  <List.GroupItem action icon="globe">
				    Consultar Proveedor
				  </List.GroupItem>
				  <List.GroupItem action icon="globe">
				    Actualizar Datos de Proveedor
				  </List.GroupItem>
			</List.Group>
		</List>
		</div>
	);
}

export default Sidebar;