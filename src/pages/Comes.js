import React, { useContext } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';
import CategoryFilters from '../components/CategoryFilters';

function Comes() {
  const { comes } = useContext(RecipesContext);
  return (
    <div>
      <Header />
      <CategoryFilters comesOuBebes="comes" />
      {
        comes.map((come, index) => {
          const { strMealThumb, strMeal } = come;
          const MAX_LENGTH = 12;
          if (index < MAX_LENGTH) {
            return (
              <Card
                key={ strMeal }
                thumb={ strMealThumb }
                name={ strMeal }
                index={ index }
              />
            );
          }
          return null;
        })
      }
    </div>
  );
}

export default Comes;
