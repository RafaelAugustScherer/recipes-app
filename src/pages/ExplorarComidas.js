import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function ExplorarComidas() {
  const history = useHistory();
  return (
    <>
      <Header title="Explorar Comidas" />

      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
      >
        Por Ingredientes
      </button>

      <button
        type="button"
        data-testid="explore-by-area"
        onClick={ () => history.push('/explorar/comidas/area') }
      >
        Por Local de Origem
      </button>

      <button
        type="button"
        data-testid="explore-surprise"
        // onClick={ () => history.push('/explorar/comidas') }
      >
        Me Surpreenda!
      </button>

      <MenuInferior />
    </>
  );
}

export default ExplorarComidas;
