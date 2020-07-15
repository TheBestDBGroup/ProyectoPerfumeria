import React from 'react';
import { Route, Switch, BrowserRouter} from 'react-router-dom'
import "tabler-react/dist/Tabler.css";
import Main from './pages/Main/Main'
import Header from './components/Header/Header'
import Proveedores from './pages/Proveedores/Proveedores'
import AgregarProveedores from './pages/AgregarProveedores/AgregarProveedores'



const subheaderLinks = {
  root:  [
  
    {
      linkName: "Proveedores",
      linkRef: "/proveedores",
    },
    {
      linkName: "Clientes",
      linkRef: "/proveedores",
    },
    {
      linkName: "Perfumes",
      linkRef: "/proveedores",
    },
    {
      linkName: "Ingredientes",
      linkRef: "/proveedores",
    },
  ],

  evaluacion:[
    {
      linkName: "Evaluaciones",
      linkRef: "/proveedores",
    },
    {
      linkName: "Fórmulas",
      linkRef: "/proveedores",
    },
    {
      linkName: "Criterios de Evaluación",
      linkRef: "/proveedores",
    },
  ],

  compras:[
    {
      linkName: "Contratos",
      linkRef: "/proveedores",
    },
  ],

  recomendador:[
    {
      linkName: "Filtros",
      linkRef: "/proveedores",
    },
  ],

}


const sidebarLinks = {
  proveedores:[
    {
      linkName: "Consultar Proveedor",
      linkRef: "/proveedores/consultar",
    },
    {
      linkName: "Agregar Proveedor",
      linkRef: "/proveedores/agregar",
    },
    {
      linkName: "Eliminar Proveedor",
      linkRef: "/proveedores/eliminar",
    },
    {
      linkName: "Actualizar Proveedor",
      linkRef: "/proveedores/actualizar",
    },
  ],
};


const routes = [
    {
      path: '/',
      render: (props) => <Main {...props} subheaderLinks={subheaderLinks.root}/>
    },
    {
      path: '/proveedores',
      render: (props) => <Proveedores {...props} subheaderLinks={subheaderLinks.root} sidebarLinks={sidebarLinks.proveedores}/>
    },
    {
      path: '/proveedores/agregar',
      render: (props) => <AgregarProveedores {...props} subheaderLinks={subheaderLinks.root} sidebarLinks={sidebarLinks.proveedores}/>
    },
    {
      path: '/evaluacion',
      render: (props) => <Main {...props}/>
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
