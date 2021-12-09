import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Comes from './pages/Comes';
import RecipesProvider from './context/RecipesProvider';
import Bebes from './pages/Bebes';

function App() {
  return (
    <BrowserRouter>
      <RecipesProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Comes } />
          <Route exact path="/bebidas" component={ Bebes } />
        </Switch>
      </RecipesProvider>
    </BrowserRouter>
  );
}

export default App;
