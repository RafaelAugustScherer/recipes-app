import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import RecipesProvider from './context/RecipesProvider';
import Drinks from './pages/Drinks';

function App() {
  return (
    <BrowserRouter>
      <RecipesProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Recipes } />
          <Route exact path="/bebidas" component={ Drinks } />
        </Switch>
      </RecipesProvider>
    </BrowserRouter>
  );
}

export default App;
