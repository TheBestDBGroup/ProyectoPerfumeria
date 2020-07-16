import React,{useState,useEffect} from 'react';
import './editar-perfume-styles.css';
import Subheader from '../../components/Subheader/Subheader'
import {Form} from 'tabler-react';
import axios from 'axios'






const EditarPerfumes = ({subheaderLinks, match}) => {


const [perfume,setPerfume] = useState(undefined);

useEffect(() => {
       /*axios.get(`/perfume/edit`)
            .then((res) => {
                 console.log('response perfume list', res.data.perfumes);
                 setPerfumes(res.data.perfumes);
            }, (error) => {
                console.log(error);
        });
        */
     
}, []);

return (
	<>
	<Subheader subheaderLinks={subheaderLinks}/>
	{console.log('match', match)}
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
}


export default EditarPerfumes