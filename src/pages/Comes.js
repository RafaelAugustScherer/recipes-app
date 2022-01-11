import React, { useContext } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';
import CategoryFilters from '../components/CategoryFilters';
import MenuInferior from '../components/MenuInferior';

function Comes() {
  const { comidas } = useContext(RecipesContext);

  return (
    <>
      <Header title="Comidas" comidasOuBebidas="comidas" />
      <div>
        <CategoryFilters comidasOuBebidas="comidas" />
        {
          comidas.map((comida, index) => {
            const { id, name, image } = comida;
            const MAX_LENGTH = 12;
            if (index < MAX_LENGTH) {
              return (
                <Card
                  key={ name }
                  thumb={ image }
                  name={ name }
                  index={ index }
                  id={ id }
                  url="comidas"
                />
              );
            }
            return null;
          })
        }
      </div>

      <MenuInferior />
    </>

  );
}

export default Comes;
