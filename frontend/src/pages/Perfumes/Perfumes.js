import React from 'react';
import './perfumes-styles.css';
import Subheader from '../../components/Subheader/Subheader'
import {Table, Button, Icon} from "tabler-react";



const Perfumes = ({subheaderLinks}) => (
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
				    <Table.ColHeader>Productor</Table.ColHeader>
				    <Table.ColHeader>Intensidad</Table.ColHeader>
				    <Table.ColHeader>Familia Olfativa</Table.ColHeader>
				    <Table.ColHeader>Acciones</Table.ColHeader>
				  </Table.Header>

				  <Table.Body>

				    <Table.Row>
				      <Table.Col>1</Table.Col>
				      <Table.Col> Nombre </Table.Col>
				      <Table.Col> Tipo </Table.Col>
				      <Table.Col> Género </Table.Col>
				      <Table.Col> Edad </Table.Col>
				      <Table.Col> Productor </Table.Col>
				      <Table.Col> Intensidad </Table.Col>
				      <Table.Col> Familia </Table.Col>
				      <Table.Col className="perfumes-table-action">
				        <Button color="primary">Editar</Button>
				        <Icon link={true} name="trash" />
				      </Table.Col>
				    </Table.Row>

				  </Table.Body>
			</Table>
		      </>
	</>
)


export default Perfumes