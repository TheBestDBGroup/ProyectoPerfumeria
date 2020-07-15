import React from 'react';
import './agregar-perfumes-styles.css';
import Subheader from '../../components/Subheader/Subheader'
import {Form} from 'tabler-react';





const AgregarPerfumes = ({sidebarLinks,subheaderLinks}) => (
	<>
	<Subheader subheaderLinks={subheaderLinks}/>
		<Form.FieldSet>
		  <Form.Group label="Nombre" isRequired>
		    <Form.Input name="example-text-input" />
		  </Form.Group>
		  <Form.Group label="Tipo" isRequired>
		    <Form.Input name="example-text-input" />
		  </Form.Group>
		  <Form.Group label="Género" isRequired>
		    <Form.Input name="example-text-input" />
		  </Form.Group>
		  <Form.Group label="Edad" className="mb-0">
		    <Form.Input name="example-text-input" />
		  </Form.Group>
		</Form.FieldSet>
	</>
)


export default AgregarPerfumes