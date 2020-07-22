import React from 'react';
import { Route, Switch, BrowserRouter} from 'react-router-dom'
import "tabler-react/dist/Tabler.css";
import Main from './pages/Main/Main'
import Header from './components/Header/Header'
import Evaluacion from './pages/Evaluacion/Evaluacion/Evaluacion'
import FiltroProductor from './components/FiltroProductor/FiltroProductor'
import EvaluacionInicial from './pages/Evaluacion/EvaluacionInicial/EvaluacionInicial'
import EvaluacionRenovacion from './pages/Evaluacion/EvaluacionRenovacion/EvaluacionRenovacion'
import NuevoContrato from './pages/Evaluacion/NuevoContrato/NuevoContrato'




const subheaderLinks = {
  root:  [
  ],

  evaluacion:[
    {
      linkName: "Evaluaciones",
      linkRef: "/",
    },
    {
      linkName: "Fórmulas",
      linkRef: "/",
    },
    {
      linkName: "Criterios de Evaluación",
      linkRef: "/s",
    },
  ],

  compras:[
    {
      linkName: "Contratos",
      linkRef: "/",
    },
  ],

  recomendador:[
    {
      linkName: "Filtros",
      linkRef: "/",
    },
  ],

}



const routes = [
    {
      path: '/',
      render: (props) => <Main {...props} />
    },
    {
      path: '/evaluacion',
      render: (props) => <Evaluacion {...props} />
    },
    {
      path: '/elegirProd/:redirectDir',
      render: (props) => <FiltroProductor {...props} />
    },
    {
      path: '/evaluacion/inicial',
      render: (props) => <EvaluacionInicial{...props} />
    },
    {
      path: '/contrato/generar/:idproveedor',
      render: (props) => <NuevoContrato {...props} />
    },
    {
      path: '/evaluacion/renovacion',
      render: (props) => <EvaluacionRenovacion {...props}/>
    },
    {
      path: '/recomendador',
      render: (props) => <Main {...props}/>
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
