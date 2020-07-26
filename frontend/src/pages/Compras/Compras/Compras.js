import React from 'react';
import './compras-styles.css'
import SubHeader from '../../../components/Subheader/Subheader'
import InfoProdSubheader from '../../../components/InfoProdSubheader/InfoProdSubheader'
import { Redirect } from 'react-router-dom'

const subheaderLinks = [
	{
		linkName: "Realizar Pedido",
		linkRef: "/comprar/contratos-vigentes",
	},
	{
		linkName: "Ver Estado Pedido",
		linkRef: "/comprar/lista-pedidos/productor",
	},
	{
		linkName: "Aceptar o Rechazar Pedido",
		linkRef: "/comprar/lista-pedidos/proveedor",
	}
]

const Compras = () => (

		<SubHeader subheaderLinks={subheaderLinks}/>
	
)


export default Compras