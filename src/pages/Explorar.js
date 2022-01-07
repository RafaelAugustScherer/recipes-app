import React from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function Explorar() {
  const history = useHistory();
  return (
    <>
      <Header title="Explorar" />
      <button
        type="button"
        data-testid="explore-food"
        onClick={ () => history.push('/explorar/comidas') }
      >
        Explorar Comidas
      </button>

      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ () => history.push('/explorar/bebidas') }
      >
        Explorar Bebidas
      </button>
      <MenuInferior />
    </>
  );
}

export default Explorar;
