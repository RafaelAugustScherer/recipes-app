import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const ENDPOINT_FOOD = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const ENDPOINT_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const fetchFood = async () => {
      const { meals } = await fetch(ENDPOINT_FOOD).then((response) => response.json());
      setFoods(meals);
    };

    const fetchDrink = async () => {
      const { drinks: apiDrinks } = await fetch(ENDPOINT_DRINK)
        .then((response) => response.json());
      setDrinks(apiDrinks);
    };

    fetchFood();
    fetchDrink();
  }, []);

  const contextValue = {
    foods,
    drinks,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
