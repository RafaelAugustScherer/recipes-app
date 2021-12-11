function UseMeal() {
  const fetchMeals = async (MAX_LENGTH) => {
    const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=').then((response) => response.json());
    return meals.slice(0, MAX_LENGTH);
  };

  const fetchMealById = async (id) => {
    const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((response) => response.json());
    return meals[0];
  };

  const fetchMealsByIngredient = async (ingredient) => {
    const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`).then((response) => response.json());
    return meals;
  };

  return {
    fetchMeals,
    fetchMealById,
    fetchMealsByIngredient,
  };
}

export default UseMeal;
