import { useState } from 'react';
import UseRecipe from './UseRecipe';

function useFavorite(id) {
  const { fetchRecipeById } = UseRecipe();

  const isFavorite = () => {
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }

    const currentFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));

    return !!currentFavorites
      .find(({ id: favoriteId }) => favoriteId === id);
  };

  const [favorite, setFavorite] = useState(isFavorite());

  const addComida = (newFavorite) => {
    const {
      strMeal: name,
      strArea: area,
      strMealThumb: image,
      strCategory: category } = newFavorite;
    return { name, area, image, category, alcoholicOrNot: '' };
  };

  const addBebida = (newFavorite) => {
    const {
      strDrink: name,
      strDrinkThumb: image,
      strCategory: category,
      strAlcoholic: alcoholicOrNot } = newFavorite;
    return { name, area: '', image, category, alcoholicOrNot };
  };

  const addFavorite = async (type) => {
    const currentFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const comesOuBebes = type === 'comida' ? 'comes' : 'bebes';
    let newFavorite = await fetchRecipeById(comesOuBebes, id);

    newFavorite = comesOuBebes === 'comes'
      ? addComida(newFavorite) : addBebida(newFavorite);

    const newFavorites = [
      ...currentFavorites,
      { id, type, ...newFavorite },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavorite(true);
  };

  const removeFavorite = () => {
    const currentFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = currentFavorites
      .filter(({ id: favoriteId }) => favoriteId !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavorite(false);
  };

  const handleFavorite = (type) => {
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }

    if (isFavorite()) {
      removeFavorite();
    } else {
      addFavorite(type);
    }
  };

  return {
    favorite,
    handleFavorite,
  };
}

export default useFavorite;
