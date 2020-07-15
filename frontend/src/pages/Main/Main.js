import React from 'react';
import './main-styles.css';
import Header from '../../components/Header/Header'
import Subheader from '../../components/Subheader/Subheader'
import Sidebar from '../../components/Sidebar/Sidebar'

const Main = () => (
	<>
	<Header/>
	<Subheader/>
	<div className="main-content-wrapper">
		<Sidebar/>
	</div>
	</>
)


export default Main