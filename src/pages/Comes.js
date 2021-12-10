import React, { useContext } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';
import CategoryFilters from '../components/CategoryFilters';
import MenuInferior from '../components/MenuInferior';

function Comes() {
  const { comes } = useContext(RecipesContext);
  return (
    <div>
      <Header title="Comidas" />
      <CategoryFilters comesOuBebes="comes" />
      {
        comes.map((come, index) => {
          const { strMealThumb, strMeal, idMeal } = come;
          const MAX_LENGTH = 12;
          if (index < MAX_LENGTH) {
            return (
              <Card
                key={ strMeal }
                thumb={ strMealThumb }
                name={ strMeal }
                index={ index }
                id={ idMeal }
                url="comidas"
              />
            );
          }
          return null;
        })
      }
      <MenuInferior />
    </div>

  );
}

export default Comes;
