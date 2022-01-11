import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function ComidaIngredientes() {
  const [filterByIngredientMeal, setFilterByIngredientMeal] = useState([]);
  const { setMealData } = useContext(RecipesContext);

  async function fetchMealIngredients() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const result = await response.json();
    setFilterByIngredientMeal(result.meals);
  }

  useEffect(() => {
    fetchMealIngredients();
  }, []);

  const setMealsByIngredients = (ingredient) => (
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then((response) => response.json())
      .then(({ meals }) => setMealData(meals))
  );
  const MAX_LENGTH = 12;
  const ingredientsLimit = filterByIngredientMeal.slice(0, MAX_LENGTH);

  return (
    <>
      <Header title="Explorar Ingredientes" />
      <div>
        { ingredientsLimit && ingredientsLimit.map((ingredient, index) => (

          // eslint-disable-next-line react/jsx-key
          <Link
            to="/comidas"
            onClick={ () => setMealsByIngredients(ingredient.strIngredient) }
            key={ ingredient.idIngredient }

          >
            <div data-testid={ `${index}-ingredient-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
                alt={ ingredient.strIngredient }
                key={ index }
              />
              <h4
                data-testid={ `${index}-card-name` }
              >
                { ingredient.strIngredient }
              </h4>
            </div>
          </Link>
        ))}

      </div>
      <MenuInferior />
    </>
  );
}

export default ComidaIngredientes;
