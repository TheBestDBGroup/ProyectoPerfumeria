import React from 'react';
import { Route, Switch, BrowserRouter} from 'react-router-dom'
import "tabler-react/dist/Tabler.css";
import Main from './pages/Main/Main'
import Header from './components/Header/Header'




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
      path: '/compras',
      render: (props) => <Main {...props}/>
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
