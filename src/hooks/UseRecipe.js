import UseDrink from './UseDrink';
import UseMeal from './UseMeal';

const {
  fetchMeals,
  fetchMealById,
  fetchMealsByIngredient,
  fetchMealsByName,
  fetchMealsByFirstLetter,
} = UseMeal();

const {
  fetchDrinks,
  fetchDrinkById,
  fetchDrinksByIngredient,
  fetchDrinksByName,
  fetchDrinksByFirstLetter,
} = UseDrink();

function UseRecipe(maxLength) {
  const fetchRecipes = async (comesOuBebes) => {
    const recipes = comesOuBebes === 'comes'
      ? await fetchMeals(maxLength)
      : await fetchDrinks(maxLength);
    return recipes;
  };

  const fetchRecipeById = async (comesOuBebes, id) => {
    const recipes = comesOuBebes === 'comes'
      ? await fetchMealById(id)
      : await fetchDrinkById(id);
    return recipes;
  };

  const fetchRecipesByIngredient = async (comesOuBebes, ingredient) => {
    const recipes = comesOuBebes === 'comes'
      ? await fetchMealsByIngredient(ingredient)
      : await fetchDrinksByIngredient(ingredient);
    return recipes;
  };

  const fetchRecipesByName = async (comesOuBebes, name) => {
    const recipes = comesOuBebes === 'comes'
      ? await fetchMealsByName(name)
      : await fetchDrinksByName(name);
    return recipes;
  };

  const fetchRecipesByFirstLetter = async (comesOuBebes, letter) => {
    const recipes = comesOuBebes === 'comes'
      ? await fetchMealsByFirstLetter(letter)
      : await fetchDrinksByFirstLetter(letter);
    return recipes;
  };

  return {
    fetchRecipes,
    fetchRecipeById,
    fetchRecipesByIngredient,
    fetchRecipesByName,
    fetchRecipesByFirstLetter,
  };
}

export default UseRecipe;
