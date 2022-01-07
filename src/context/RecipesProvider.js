import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import RecipesContext from './RecipesContext';
import useRecipe from '../hooks/UseRecipe';

function RecipesProvider({ children }) {
  const MAX_LENGTH = 12;
  const { fetchRecipes } = useRecipe(MAX_LENGTH);

  const [comidas, setComidas] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [backup, setBackup] = useState([]);

  useEffect(() => {
    const fetchComidas = async () => {
      const meals = await fetchRecipes('comidas');
      setComidas(meals);
    };

    const fetchBebidas = async () => {
      const drinks = await fetchRecipes('bebidas');
      setBebidas(drinks);
    };

    fetchComidas();
    fetchBebidas();
    // eslint-disable-next-line
  }, []);

  const contextValue = {
    backup,
    setBackup,
    comidas,
    setComidas,
    bebidas,
    setBebidas,
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
