import React,{useState} from 'react';
import './agregar-perfumes-styles.css';
import Subheader from '../../components/Subheader/Subheader'
import {Form,Button} from 'tabler-react';
import axios from 'axios'


const AgregarPerfumes = ({sidebarLinks,subheaderLinks}) => {

const [perfume,setPerfume] = useState({edad_perfume:'',genero_perfume:'',nombre_perfume:'',tipo_perfume:''});

const handleChange = e => {
    setPerfume({ ...perfume, [e.target.name]: e.target.value })
}

const handleSubmit = e => {
	e.preventDefault()
	axios.post(`/perfume/add`,perfume)         
       .then((res) => {
                 console.log('response perfume single', res.data.message);
                 alert(res.data.message)
            }, (error) => {
                console.log(error);
        });   
}

return (
		<>
		<Subheader subheaderLinks={subheaderLinks}/>
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
			  <Button onClick={handleSubmit} color="primary"> Agregar </Button>
			</Form.FieldSet>
		</>
)}


export default AgregarPerfumes