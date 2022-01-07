import React, { useState, useEffect } from 'react';
import CardRecipes from '../components/CardRecipes';
import FilterButtons from '../components/FilterButtons';
import Header from '../components/Header';

function ReceitasFavoritas() {
  const [recipes, setRecipes] = useState([]);
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  useEffect(() => {
    setRecipes(favoriteRecipes);
  // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header title="Receitas Favoritas" />
      <FilterButtons
        setRecipes={ setRecipes }
        favorite
        favoriteRecipes={ favoriteRecipes }
      />
      {
        recipes.map((recipe, index) => (
          <CardRecipes
            key={ recipe.name }
            index={ index }
            recipe={ recipe }
            url={ recipe.type === 'comida' ? 'comidas' : 'bebidas' }
          />))
      }
    </>
  );
}

export default ReceitasFavoritas;
