import UseDrink from './UseDrink';
import UseMeal from './UseMeal';

const {
  fetchMeals,
  fetchMealCategories,
  fetchMealById,
  fetchMealsByIngredient,
  fetchMealsByName,
  fetchMealsByFirstLetter,
} = UseMeal();

const {
  fetchDrinks,
  fetchDrinkCategories,
  fetchDrinkById,
  fetchDrinksByIngredient,
  fetchDrinksByName,
  fetchDrinksByFirstLetter,
} = UseDrink();

const COMIDAS = 'comidas';

function UseRecipe(maxLength) {
  const fetchRecipes = async (comidasOuBebidas) => {
    const recipes = comidasOuBebidas === COMIDAS
      ? await fetchMeals(maxLength)
      : await fetchDrinks(maxLength);
    return recipes;
  };

  const fetchCategories = async (comidasOuBebidas) => {
    const categories = comidasOuBebidas === COMIDAS
      ? await fetchMealCategories(maxLength)
      : await fetchDrinkCategories(maxLength);
    return categories;
  };

  const fetchRecipeById = async (comidasOuBebidas, id) => {
    const recipes = comidasOuBebidas === COMIDAS
      ? await fetchMealById(id)
      : await fetchDrinkById(id);
    return recipes;
  };

  const fetchRecipesByIngredient = async (comidasOuBebidas, ingredient) => {
    const recipes = comidasOuBebidas === COMIDAS
      ? await fetchMealsByIngredient(ingredient)
      : await fetchDrinksByIngredient(ingredient);
    return recipes;
  };

  const fetchRecipesByName = async (comidasOuBebidas, name) => {
    const recipes = comidasOuBebidas === COMIDAS
      ? await fetchMealsByName(name)
      : await fetchDrinksByName(name);
    return recipes;
  };

  const fetchRecipesByFirstLetter = async (comidasOuBebidas, letter) => {
    const recipes = comidasOuBebidas === COMIDAS
      ? await fetchMealsByFirstLetter(letter)
      : await fetchDrinksByFirstLetter(letter);
    return recipes;
  };

  return {
    fetchRecipes,
    fetchCategories,
    fetchRecipeById,
    fetchRecipesByIngredient,
    fetchRecipesByName,
    fetchRecipesByFirstLetter,
  };
}

export default UseRecipe;
