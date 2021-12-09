import React, { useContext } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';
import CategoryFilters from '../components/CategoryFilters';

function Bebes() {
  const { bebes } = useContext(RecipesContext);
  return (
    <div>
      <Header />
      <CategoryFilters comesOuBebes="bebes" />
      {
        bebes.map((bebe, index) => {
          const { strDrinkThumb, strDrink } = bebe;
          const MAX_LENGTH = 12;
          if (index < MAX_LENGTH) {
            return (
              <Card
                key={ strDrink }
                thumb={ strDrinkThumb }
                name={ strDrink }
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

export default Bebes;
