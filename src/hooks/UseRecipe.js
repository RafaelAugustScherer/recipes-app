import UseDrink from './UseDrink';
import UseMeal from './UseMeal';

function UseRecipe(maxLength) {
  const { fetchMeals, fetchMealById, fetchMealsByIngredient } = UseMeal();
  const { fetchDrinks, fetchDrinkById, fetchDrinksByIngredient } = UseDrink();

  const fetchRecipes = async (comesOuBebes) => {
    if (comesOuBebes === 'comes') {
      const meals = await fetchMeals(maxLength);
      return meals;
    }
    const drinks = await fetchDrinks(maxLength);
    return drinks;
  };

  const fetchRecipeById = async (comesOuBebes, id) => {
    if (comesOuBebes === 'comes') {
      const meal = await fetchMealById(id);
      return meal;
    }
    const drink = await fetchDrinkById(id);
    return drink;
  };

  const fetchRecipesByIngredient = async (comesOuBebes, ingredient) => {
    if (comesOuBebes === 'comes') {
      const meal = await fetchMealsByIngredient(ingredient);
      return meal;
    }
    const drink = await fetchDrinksByIngredient(ingredient);
    return drink;
  };

  return {
    fetchRecipes,
    fetchRecipeById,
    fetchRecipesByIngredient,
  };
}

export default UseRecipe;
