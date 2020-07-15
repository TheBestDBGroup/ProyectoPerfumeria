import React from 'react';
import { Route, Switch, BrowserRouter} from 'react-router-dom'
import "tabler-react/dist/Tabler.css";
import Main from './pages/Main/Main'


const routes = [
    {
      path: '/',
      render: (props) => <Main {...props}/>
    },
];

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {routes.map(
              ({path,render}) => (
                <Route exact path={path} key={path} render={(props) => render(props)}/>
              )
            )
          }
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
