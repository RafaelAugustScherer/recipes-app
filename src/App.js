import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Comes from './pages/Comes';
import RecipesProvider from './context/RecipesProvider';
import Bebes from './pages/Bebes';
import Detalhes from './pages/Detalhes';
import Perfil from './pages/Perfil';

function App() {
  return (
    <BrowserRouter>
      <RecipesProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Comes } />
          <Route exact path="/bebidas" component={ Bebes } />
          <Route exac t path="/comidas/:id" component={ Detalhes } />
          <Route exact path="/bebidas/:id" component={ Detalhes } />
          <Route exact path="/perfil" component={ Perfil } />
        </Switch>
      </RecipesProvider>
    </BrowserRouter>
  );
}

export default App;
