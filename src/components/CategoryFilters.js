import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function CategoryFilters({ comesOuBebes }) {
  const [state, setState] = useState({
    categories: [],
    isFiltered: false,
  });
  const {
    comes,
    bebes,
    setComes,
    setBebes,
    backup,
    setBackup,
  } = useContext(RecipesContext);

  useEffect(() => {
    const ENDPOINT_COMES = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const ENDPOINT_BEBES = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

    const fetchComesCategories = async () => {
      const { meals } = await fetch(ENDPOINT_COMES).then((response) => response.json());
      const categories = meals.map(({ strCategory }) => strCategory);
      setState({ ...state, categories });
    };

    const fetchBebesCategories = async () => {
      const { drinks } = await fetch(ENDPOINT_BEBES).then((response) => response.json());
      const categories = drinks.map(({ strCategory }) => strCategory);
      setState({ ...state, categories });
    };

    if (comesOuBebes === 'comes') fetchComesCategories();
    if (comesOuBebes === 'bebes') fetchBebesCategories();
  }, []);

  const toggleFilter = async (category) => {
    const { isFiltered } = state;
    if (isFiltered && comesOuBebes === 'comes') {
      setComes(backup);
      setState({ ...state, isFiltered: false });
      return null;
    }
    if (isFiltered && comesOuBebes === 'bebes') {
      setBebes(backup);
      setState({ ...state, isFiltered: false });
      return null;
    }

    if (comesOuBebes === 'comes') {
      const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      const { meals } = await fetch(ENDPOINT).then((response) => response.json());
      setBackup(comes);
      setComes(meals);
      setState({ ...state, isFiltered: true });
    } else {
      const ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
      const { drinks } = await fetch(ENDPOINT).then((response) => response.json());
      setBackup(bebes);
      setBebes(drinks);
      setState({ ...state, isFiltered: true });
    }
  };

  return (
    <div>
      {
        state.categories.map((category, index) => {
          const MAX_LENGTH = 5;
          return index < MAX_LENGTH
            ? (
              <button
                data-testid={ `${category}-category-filter` }
                key={ category }
                type="button"
                onClick={ () => toggleFilter(category) }
              >
                { category }
              </button>
            ) : null;
        })
      }
    </div>
  );
}

CategoryFilters.propTypes = {
  comesOuBebes: PropTypes.string,
}.isRequired;

export default CategoryFilters;
