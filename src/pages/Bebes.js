import React, { useContext } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';
import CategoryFilters from '../components/CategoryFilters';
import MenuInferior from '../components/MenuInferior';

function Bebes() {
  const { bebes } = useContext(RecipesContext);
  return (
    <>
      <Header title="Bebidas" comesOuBebes="bebes" />
      <div>
        <CategoryFilters comesOuBebes="bebes" />
        {
          bebes.map((bebe, index) => {
            const { strDrinkThumb, strDrink, idDrink } = bebe;
            const MAX_LENGTH = 12;
            if (index < MAX_LENGTH) {
              return (
                <Card
                  key={ strDrink }
                  thumb={ strDrinkThumb }
                  name={ strDrink }
                  index={ index }
                  id={ idDrink }
                  url="bebidas"
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

export default Bebes;
