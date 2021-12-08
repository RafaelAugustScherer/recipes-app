import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const ENDPOINT_FOOD = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFood = async () => {
      const { meals } = await fetch(ENDPOINT_FOOD).then((response) => response.json());
      setFoods(meals);
    };
    fetchFood();
  }, []);

  const contextValue = {
    foods,
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
