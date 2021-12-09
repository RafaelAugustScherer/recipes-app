import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function CategoryFilters({ comesOuBebes }) {
  const [state, setState] = useState({
    categories: [],
    currentFilter: '',
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

  const fetchCategories = async (category) => {
    if (comesOuBebes === 'comes') {
      const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      const { meals } = await fetch(ENDPOINT).then((response) => response.json());
      setComes(meals);
      setState({ ...state, currentFilter: category });
    } else {
      const ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
      const { drinks } = await fetch(ENDPOINT).then((response) => response.json());
      setBebes(drinks);
      setState({ ...state, currentFilter: category });
    }
  };

  const toggleFilter = async (category) => {
    const { currentFilter } = state;

    if (currentFilter === category) {
      if (comesOuBebes === 'comes') {
        setComes(backup);
        setState({ ...state, currentFilter: '' });
      } else {
        setBebes(backup);
        setState({ ...state, currentFilter: '' });
      }
      return null;
    }

    if (currentFilter === '') {
      if (comesOuBebes === 'comes') {
        setBackup(comes);
        fetchCategories(category);
      } else {
        setBackup(bebes);
        fetchCategories(category);
      }
      return null;
    }
    fetchCategories(category);
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
