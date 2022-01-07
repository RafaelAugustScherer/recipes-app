import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const ENDPOINT_COMES = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const ENDPOINT_BEBES = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const [comes, setComes] = useState([]);
  const [bebes, setBebes] = useState([]);
  const [backup, setBackup] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const fetchComes = async () => {
      const { meals } = await fetch(ENDPOINT_COMES).then((response) => response.json());
      setComes(meals);
    };

    const fetchBebes = async () => {
      const { drinks } = await fetch(ENDPOINT_BEBES).then((response) => response.json());
      setBebes(drinks);
    };

    fetchComes();
    fetchBebes();
  }, []);

  const startLocalStorage = () => {
    if (!localStorage.getItem('inProgressRecipes')) {
      localStorage
        .setItem('inProgressRecipes', JSON.stringify({ cocktails: {}, meals: {} }));
    }
    if (!localStorage.getItem('doneRecipes')) {
      localStorage
        .setItem('doneRecipes', JSON.stringify([]));
    }

    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([]));
    }
  };

  const contextValue = {
    backup,
    setBackup,
    comes,
    setComes,
    bebes,
    setBebes,
    favoriteRecipes,
    setFavoriteRecipes,
    startLocalStorage,
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
