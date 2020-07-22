import React from 'react';
import {List} from "tabler-react";
import './sidebar-styles.css';
import { Link as DomLink } from 'react-router-dom'


const Sidebar = ({sidebarLinks}) => {
	return (
		<div className="sidebar-wrapper">
		<List className="sidebar-nav">
			<List.Group className="sidebar-nav-listgroup">
				{sidebarLinks.map(({linkName, linkRef}) => (
					<DomLink
			          to={linkRef}
			          style={{
			            textDecoration: 'none',
			            color:'#9aa0ac'
			          }}>
					<List.GroupItem action icon="globe">
				   		{linkName}
				 	</List.GroupItem>
				 	</DomLink>
				))}				
			</List.Group>
		</List>
		</div>
	);
}

export default Sidebar;