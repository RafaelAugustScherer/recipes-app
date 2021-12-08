import React, { useContext } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';
import CategoryFilters from '../components/CategoryFilters';

function Recipes() {
  const { foods } = useContext(RecipesContext);
  return (
    <div>
      <Header />
      <CategoryFilters comesOuBebes="comes" />
      {
        foods.map((food, index) => {
          const { strMealThumb, strMeal } = food;
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

export default Recipes;
