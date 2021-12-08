import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

function CategoryFilters({ comesOuBebes }) {
  const ENDPOINT_FOOD = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const ENDPOINT_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchFoodCategories = async () => {
      const { meals } = await fetch(ENDPOINT_FOOD).then((response) => response.json());
      const newCategories = meals.map(({ strCategory }) => strCategory);
      setCategories(newCategories);
    };

    const fetchDrinkCategories = async () => {
      const { drinks } = await fetch(ENDPOINT_DRINK).then((response) => response.json());
      const newCategories = drinks.map(({ strCategory }) => strCategory);
      setCategories(newCategories);
    };

    if (comesOuBebes === 'comes') fetchFoodCategories();
    else fetchDrinkCategories();
  }, []);

  return (
    <div>
      {
        categories.map((category, index) => {
          const MAX_LENGTH = 5;
          return index < MAX_LENGTH
            ? (
              <button
                data-testid={ `${category}-category-filter` }
                key={ category }
                type="button"
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
