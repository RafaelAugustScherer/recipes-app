import UseDrink from './UseDrink';
import UseMeal from './UseMeal';

function UseRecipe(maxLength) {
  const { fetchMeals, fetchMealById } = UseMeal();
  const { fetchDrinks, fetchDrinkById } = UseDrink();

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
      console.log(meal);
      return meal;
    }
    const drink = await fetchDrinkById(id);
    return drink;
  };

  return {
    fetchRecipes,
    fetchRecipeById,
  };
}

export default UseRecipe;
