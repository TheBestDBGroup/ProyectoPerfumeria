import React from 'react';
import { Route, Switch, BrowserRouter} from 'react-router-dom'
import "tabler-react/dist/Tabler.css";
import Main from './pages/Main/Main'
import Header from './components/Header/Header'

//Componentes de Evaluacion
import Evaluacion from './pages/Evaluacion/Evaluacion/Evaluacion'
import FiltroProductor from './components/FiltroProductor/FiltroProductor'
import NuevoContrato from './pages/Evaluacion/NuevoContrato/NuevoContrato'
import ChooseEvalType from './pages/Evaluacion/ChooseEvalType/ChooseEvalType'
import CrearEvaluacion from './pages/Evaluacion/CrearEvaluacion/CrearEvaluacion'
import RealizarEvaluacionInicial from './pages/Evaluacion/RealizarEvaluacionInicial/RealizarEvaluacionInicial'
import RealizarEvaluacionRenovacion from './pages/Evaluacion/RealizarEvaluacionRenovacion/RealizarEvaluacionRenovacion'
import MostrarCondiciones from './pages/Evaluacion/MostrarCondiciones/MostrarCondiciones'
import LlenarCriterios from './pages/Evaluacion/LlenarCriterios/LlenarCriterios'
import MostrarResultado from './pages/Evaluacion/MostrarResultado/MostrarResultado'
import ProveedoresVigentes from './pages/Evaluacion/ProveedoresVigentes/ProveedoresVigentes'
import CancelarContrato from './pages/Evaluacion/CancelarContrato/CancelarContrato'


//Componentes de Compras
import Compras from './pages/Compras/Compras/Compras'
import ContratosVigentes from './pages/Compras/ContratosVigentes/ContratosVigentes'
import MostrarDetallesContrato from './pages/Compras/MostrarDetallesContrato/MostrarDetallesContrato'
import EncabezadoPedido from './pages/Compras/EncabezadoPedido/EncabezadoPedido'
import AgregarDetalles from './pages/Compras/AgregarDetalles/AgregarDetalles'
import AgregarEnvio from './pages/Compras/AgregarEnvio/AgregarEnvio'
import AgregarPago from './pages/Compras/AgregarPago/AgregarPago'
import ListaPedidos from './pages/Compras/ListaPedidos/ListaPedidos'
import VerPagos from './pages/Compras/VerPagos/VerPagos'
import ListaPorConfirmar from './pages/Compras/ListaPorConfirmar/ListaPorConfirmar'
import FiltroProveedor from './components/FiltroProveedor/FiltroProveedor'

const routes = [
    {//root
      path: '/',
      render: (props) => <Main {...props} />
    },
    //RUTAS DE EVALUACION //
    {//menu de evaluacion
      path: '/evaluacion',
      render: (props) => <Evaluacion {...props} />
    },
    {//redireccion para escoger el productor en el filtro de Prod
      path: '/elegirProd/:redirectDir',
      render: (props) => <FiltroProductor {...props} />
    },
    {//redireccion para escoger el proveedor en el filtro de Prod
      path: '/elegirProv/:redirectDir',
      render: (props) => <FiltroProveedor {...props} />
    },
    {//elegir tipo de crear evaluacion o realizar evaluacion tipo = crear-evaluacion o realizar-evaluacion
      path: '/evaluacion/evaluar/:tipo',
      render: (props) => <ChooseEvalType {...props} />
    },
    { //crear evaluacion, :tipo = inicial o renovacion
      path: '/crear-evaluacion/:tipo',
      render: (props) => <CrearEvaluacion {...props} />
    },
    { //lista de proveedores potenciales
      path: '/realizar-evaluacion/inicial',
      render: (props) => <RealizarEvaluacionInicial {...props} />
    },
    { //lista de proveedores con contrato pendiente a renovar
      path: '/realizar-evaluacion/renovacion',
      render: (props) => <RealizarEvaluacionRenovacion {...props} />
    },
    { //muestra las condiciones de evalucion del proveedor
      path: '/evaluacion/mostrar-condiciones-eval-inicial/:idproveedor',
      render: (props) => <MostrarCondiciones {...props} />
    },
    { // form donde se llenan los criterios de evaluacion para el proveedor
      path: '/realizar-evaluacion/llenar-criterios/:idproveedor/:tipoeval/:idcontrato',
      render: (props) => <LlenarCriterios {...props} />
    },
    { //aqui se renueva contrato :status=true paso/false no paso 
      path: '/realizar-evaluacion/resultados-eval/:tipoeval/:calificacion/:status/:idproveedor/:idcontrato',
      render: (props) => <MostrarResultado {...props} />
    },
    { //crear contrato
      path: '/contrato/crear/:idproveedor',
      render: (props) => <NuevoContrato {...props} />
    },
    { //listas de contratos vigentes
      path: '/contrato/ver-vigentes',
      render: (props) => <ProveedoresVigentes {...props} />
    },
    { //pantalla para cancelar y poner motivos de cancelacion
      path: '/contrato/cancelar/:idContrato',
      render: (props) => <CancelarContrato {...props} />
    },
    { // pantalla para cancelar y poner motivos de cancelacion
      path: '/compras',
      render: (props) => <Compras {...props} />
    },
    {
      path: '/comprar/contratos-vigentes',
      render: (props) => <ContratosVigentes {...props} />
    }, 
    {
      path: '/comprar/detalles-contrato/:idcontrato/:idproveedor',
      render: (props) => <MostrarDetallesContrato {...props} />
    }, 
    {
      path: '/realizar-pedido/encabezado/:idcontrato/:idproveedor',
      render: (props) => <EncabezadoPedido {...props} />
    }, 
    {
      path: '/realizar-pedido/agregar-detalles/:idpedido',
      render: (props) => <AgregarDetalles {...props} />
    }, 
    {
      path: '/realizar-pedido/agregar-envio/:idpedido',
      render: (props) => <AgregarEnvio {...props} />
    }, 
    {
      path: '/realizar-pedido/agregar-forma-pago/:idpedido',
      render: (props) => <AgregarPago {...props} />
    },
    {
      path: '/comprar/lista-pedidos/productor',
      render: (props) => <ListaPedidos {...props} />
    },  
    {
      path: '/ver-pagos/:idpedido',
      render: (props) => <VerPagos {...props} />
    }, 
    {
      path: '/comprar/lista-pedidos/proveedor',
      render: (props) => <ListaPorConfirmar {...props} />
    },  

];

function App() {
  return (
    <div className="App">   
      <BrowserRouter>
        <Switch>
          <>
          <Header/>

          {routes.map(
              ({path,render}) => (
                <Route exact path={path} key={path} render={(props) => render(props)}/>
              )
            )
          }
          </>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
