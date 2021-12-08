import React, { useContext } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';

function Drinks() {
  const { drinks } = useContext(RecipesContext);
  return (
    <div>
      <Header />
      {
        drinks.map((drink, index) => {
          const { strDrinkThumb, strDrink } = drink;
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

export default Drinks;
