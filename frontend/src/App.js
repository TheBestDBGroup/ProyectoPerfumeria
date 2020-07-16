import React from 'react';
import { Route, Switch, BrowserRouter} from 'react-router-dom'
import "tabler-react/dist/Tabler.css";
import Main from './pages/Main/Main'
import Header from './components/Header/Header'
import Perfumes from './pages/Perfumes/Perfumes'
import AgregarPerfumes from './pages/AgregarPerfumes/AgregarPerfumes'
import EditarPerfume from './pages/EditarPerfume/EditarPerfume'



const subheaderLinks = {
  root:  [
    {
      linkName: "Perfumes",
      linkRef: "/perfumes",
    },
    {
      linkName: "Agregar Perfume",
      linkRef: "/perfumes/agregar",
    }
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


const sidebarLinks = {
  perfumes:[
    {
      linkName: "Agregar Perfume",
      linkRef: "/perfumes/agregar",
    },
  ],
};


const routes = [
    {
      path: '/',
      render: (props) => <Main {...props} subheaderLinks={subheaderLinks.root}/>
    },
    {
      path: '/perfumes',
      render: (props) => <Perfumes {...props} subheaderLinks={subheaderLinks.root} sidebarLinks={sidebarLinks.perfumes}/>
    },
    {
      path: '/perfumes/agregar',
      render: (props) => <AgregarPerfumes {...props} subheaderLinks={subheaderLinks.root} sidebarLinks={sidebarLinks.perfumes}/>
    },
    {
      path: '/perfumes/editar/:id',
      render: (props) => <EditarPerfume {...props} subheaderLinks={subheaderLinks.root}/>
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
