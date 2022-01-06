import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Header from '../components/Header';

function ReceitasFavoritas() {
  const [recipes, setRecipes] = useState([]);

  const applyFilter = (type) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    switch (type) {
    case 'food': {
      setRecipes(favoriteRecipes.filter(({ type: favType }) => favType === 'comida'));
      break;
    }
    case 'drink': {
      setRecipes(favoriteRecipes.filter(({ type: favType }) => favType === 'bebida'));
      break;
    }
    default: {
      setRecipes(favoriteRecipes);
    }
    }
  };

  return (
    <>
      <Header title="Receitas Favoritas" />
      <button type="button" onClick={ () => applyFilter('all') }>All</button>
      <button type="button" onClick={ () => applyFilter('food') }>Food</button>
      <button type="button" onClick={ () => applyFilter('drink') }>Drinks</button>
      {
        recipes.map(({ id, name, image, type }, index) => (
          <Card
            key={ name }
            thumb={ image }
            name={ name }
            index={ index }
            id={ id }
            url={ type === 'comida' ? 'comidas' : 'bebidas' }
          />))
      }
    </>
  );
}

export default ReceitasFavoritas;
