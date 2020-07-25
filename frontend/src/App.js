import React from 'react';
import { Route, Switch, BrowserRouter} from 'react-router-dom'
import "tabler-react/dist/Tabler.css";
import Main from './pages/Main/Main'
import Header from './components/Header/Header'
import Evaluacion from './pages/Evaluacion/Evaluacion/Evaluacion'
import FiltroProductor from './components/FiltroProductor/FiltroProductor'
import NuevoContrato from './pages/Evaluacion/NuevoContrato/NuevoContrato'
import ChooseEvalType from './pages/Evaluacion/ChooseEvalType/ChooseEvalType'
import CrearEvaluacion from './pages/Evaluacion/CrearEvaluacion/CrearEvaluacion'
import RealizarEvaluacionInicial from './pages/Evaluacion/RealizarEvaluacionInicial/RealizarEvaluacionInicial'
import RealizarEvaluacionRenovacion from './pages/Evaluacion/RealizarEvaluacionRenovacion/RealizarEvaluacionRenovacion'
import MostrarCondiciones from './pages/Evaluacion/MostrarCondiciones/MostrarCondiciones'
import LlenarCriterios from './pages/Evaluacion/LlenarCriterios/LlenarCriterios'
//> /evaluacion/mostrar-condiciones-eval-inicial/
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
      path: '/realizar-evaluacion/llenar-criterios/:idproveedor/:tipoeval',
      render: (props) => <LlenarCriterios {...props} />
    },
    { //no implementado,resultados evaluacion --aqui se renueva contrato :estatus=true paso/false no paso
      path: '/realizar-evaluacion/resultados-eval/:tipoeval/:calificacion/:estatus/:idproveedor',
      render: (props) => <Main {...props} />
    },
    { //no implementado, crear contrato
      path: '/contrato/crear',
      render: (props) => <Main {...props} />
    },
    { //no implementado, listas de contratos vigentes
      path: '/contrato/ver-vigentes',
      render: (props) => <Main {...props} />
    },
    { //no implementado, pantalla para cancelar y poner motivos de cancelacion
      path: '/contrato/cancelar/:idContrato',
      render: (props) => <Main {...props} />
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
