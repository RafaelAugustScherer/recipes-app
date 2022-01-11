import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function BebidaIngredientes() {
  const [filterByIngredientDrink, setFilterByIngredientDrink] = useState([]);
  async function fetchDrinksIngredients() {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const result = await response.json();
    setFilterByIngredientDrink(result.drinks);
  }
  
  useEffect(() => {
    fetchDrinksIngredients();
  }, []);

  const MAX_LENGTH = 12;
  const ingredientsLimit = filterByIngredientDrink.slice(0, MAX_LENGTH);

  return (
    <>
      <Header title="Explorar Ingredientes" />
      <div>
        { ingredientsLimit.map((ingredient, index) => (

          // eslint-disable-next-line react/jsx-key
          <Link
            to="/bebidas"

          >
            <div data-testid={ `${index}-ingredient-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
                alt={ ingredient.strIngredient1 }
                key={ index }
              />
              <h4
                data-testid={ `${index}-card-name` }
              >
                { ingredient.strIngredient1 }
              </h4>
            </div>
          </Link>
        ))}

      </div>
      <MenuInferior />
    </>
  );
}

export default BebidaIngredientes;
