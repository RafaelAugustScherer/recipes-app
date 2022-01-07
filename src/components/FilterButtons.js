import PropTypes from 'prop-types';
import React from 'react';

function FilterButtons({ setRecipes, favorite, favoriteRecipes }) {
  const applyFilter = (type) => {
    switch (type) {
    case 'food': {
      if (favorite) {
        setRecipes(favoriteRecipes.filter(({ type: favType }) => favType === 'comida'));
      } else {
        console.log('feitas');
      }
      break;
    }
    case 'drink': {
      if (favorite) {
        setRecipes(favoriteRecipes.filter(({ type: favType }) => favType === 'bebida'));
      } else {
        console.log('feitas');
      }
      break;
    }
    default: {
      if (favorite) {
        setRecipes(favoriteRecipes);
      } else {
        console.log('feitas');
      }
    }
    }
  };

  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => applyFilter('all') }
      >
        All

      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ () => applyFilter('food') }
      >
        Food

      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => applyFilter('drink') }
      >
        Drinks

      </button>
    </div>
  );
}

FilterButtons.propTypes = {
  favorite: PropTypes.bool,
  favoriteRecipes: PropTypes.arrayOf(PropTypes.object),
  setRecipes: PropTypes.func,
}.isRequired;

export default FilterButtons;
