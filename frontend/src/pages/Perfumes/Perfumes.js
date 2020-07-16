import React,{useEffect,useState} from 'react';
import './perfumes-styles.css';
import Subheader from '../../components/Subheader/Subheader'
import {Table, Button, Icon} from "tabler-react";
import axios from 'axios';
import { Link as DomLink } from 'react-router-dom'


const Perfumes = ({subheaderLinks}) => {

	const [perfumes,setPerfumes] = useState(undefined);

	useEffect(() => {
	       axios.get(`/perfume/list`)
	            .then((res) => {
	                 console.log('response perfume list', res.data.perfumes);
	                 setPerfumes(res.data.perfumes);
	            }, (error) => {
	                console.log(error);
	        });
	     
	}, []);


	if(perfumes) {
		return (
			<>
			<Subheader subheaderLinks={subheaderLinks}/>     
			          <>
			          <Table>

						  <Table.Header>
						    <Table.ColHeader>ID</Table.ColHeader>
						    <Table.ColHeader>Nombre</Table.ColHeader>
						    <Table.ColHeader>Tipo</Table.ColHeader>
						    <Table.ColHeader>Género</Table.ColHeader>
						    <Table.ColHeader>Edad</Table.ColHeader>
						    <Table.ColHeader>Acciones</Table.ColHeader>
						  </Table.Header>

						  <Table.Body>
						  { perfumes.map( perfume => (
						    <Table.Row>
						     	<Table.Col>{perfume.id_perfume} </Table.Col>
						    	<Table.Col>{perfume.nombre_perfume}</Table.Col>
						    	<Table.Col>{perfume.tipo_perfume} </Table.Col>
						     	<Table.Col>{perfume.genero_perfume} </Table.Col>
						    	<Table.Col> {perfume.edad_perfume} </Table.Col>
						    	<Table.Col className="perfumes-table-action">
								<DomLink
						        	to={`/perfumes/editar/${perfume.id_perfume}`}
						        	style={{
						            	textDecoration: 'none',
						            	color:'#9aa0ac'
						            }}
						         >
						        <Button color="primary">Editar</Button>
						        </DomLink>
						        <Icon link={true} name="trash" />
						      </Table.Col>
						    </Table.Row>
						   ))}

						  </Table.Body>
					</Table>
				      </>
			</>
		)
	} else {
		return null
	}
}


export default Perfumes