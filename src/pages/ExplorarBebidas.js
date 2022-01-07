import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function ExplorarBebidas() {
  const history = useHistory();

  return (
    <>
      <Header title="Explorar Bebidas" />

      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
      >
        Por Ingredientes
      </button>

      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => history.push('/explorar/comidas') }
      >
        Me Surpreenda!
      </button>

      <MenuInferior />
    </>
  );
}

export default ExplorarBebidas;
