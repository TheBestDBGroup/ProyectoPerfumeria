import React,{useState,useEffect} from 'react';
import './editar-perfume-styles.css';
import Subheader from '../../components/Subheader/Subheader'
import {Form,Button} from 'tabler-react';
import axios from 'axios'



const EditarPerfumes = ({subheaderLinks, match}) => {

const id = match.params.id

const [perfume,setPerfume] = useState({edad_perfume:'',genero_perfume:'',nombre_perfume:'',tipo_perfume:'',id_perfume:id});

const handleChange = e => {
    setPerfume({ ...perfume, [e.target.name]: e.target.value })
}

const handleSubmit = e => {
	e.preventDefault()
	axios.post(`/perfume/edit`,perfume)         
       .then((res) => {
                 console.log('response perfume single', res.data.message);
                 alert(res.data.message)
            }, (error) => {
                console.log(error);
        });   
}

useEffect(() => {
       axios.post(`/perfume/read`,{
       		id: id
       	})         
       .then((res) => {
                 console.log('response perfume single', res.data.perfume);
                 setPerfume(res.data.perfume[0]);
            }, (error) => {
                console.log(error);
        });   
}, [id]);



return (
	<>
	<Subheader subheaderLinks={subheaderLinks}/>
	{console.log('perfume', perfume)}
		<Form.FieldSet>
		  <Form.Group label="Nombre" isRequired>
		    <Form.Input name="nombre_perfume"  onChange={handleChange} value={perfume.nombre_perfume} />
		  </Form.Group>
		  <Form.Group label="Tipo" isRequired>
		    <Form.Input name="tipo_perfume"  onChange={handleChange} value={perfume.tipo_perfume}  />
		  </Form.Group>
		  <Form.Group label="Género" isRequired>
		    <Form.Input name="genero_perfume"  onChange={handleChange} value={perfume.genero_perfume}  />
		  </Form.Group>
		  <Form.Group label="Edad" className="mb-0">
		    <Form.Input name="edad_perfume"  onChange={handleChange} value={perfume.edad_perfume}  />
		  </Form.Group>
		  <Button onClick={handleSubmit} color="primary">Editar</Button>
		</Form.FieldSet>
	</>
)
}


export default EditarPerfumes