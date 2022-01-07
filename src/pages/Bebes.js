import React, { useContext } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';
import CategoryFilters from '../components/CategoryFilters';
import MenuInferior from '../components/MenuInferior';

function Bebes() {
  const { bebidas } = useContext(RecipesContext);
  return (
    <>
      <Header title="Bebidas" comidasOuBebidas="bebidas" />
      <div>
        <CategoryFilters comidasOuBebidas="bebidas" />
        {
          bebidas.map((bebida, index) => {
            const { id, name, image } = bebida;
            return (
              <Card
                key={ name }
                thumb={ image }
                name={ name }
                index={ index }
                id={ id }
                url="bebidas"
              />
            );
          })
        }
      </div>
      <MenuInferior />
    </>
  );
}

export default Bebes;
