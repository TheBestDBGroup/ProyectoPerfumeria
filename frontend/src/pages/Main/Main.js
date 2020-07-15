import React from 'react';
import './main-styles.css';
import Subheader from '../../components/Subheader/Subheader'

const Main = ({subheaderLinks}) => (
	<>
		<div className="main-content-wrapper">
		          <Subheader subheaderLinks={subheaderLinks}/>
		</div>
	</>
)


export default Main