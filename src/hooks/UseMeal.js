function UseMeal() {
  const convertApiResult = (meal) => {
    const alcoholicOrNot = '';
    const { idMeal: id, strMeal: name, strMealThumb: image } = meal;
    return { id, name, image, alcoholicOrNot, ...meal };
  };

  const fetchMeals = async (maxLength) => {
    let { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=').then((response) => response.json());
    meals = meals.map((meal) => convertApiResult(meal));
    return meals.slice(0, maxLength);
  };

  const fetchMealCategories = async (maxLength) => {
    const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list').then((response) => response.json());
    return meals.map(({ strCategory }) => strCategory).slice(0, maxLength);
  };

  const fetchMealById = async (id) => {
    const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((response) => response.json());
    return convertApiResult(meals[0]);
  };

  const fetchMealsByIngredient = async (ingredient) => {
    const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`).then((response) => response.json());
    return convertApiResult(meals[0]);
  };

  const fetchMealsByName = async (name) => {
    const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`).then((response) => response.json());
    return convertApiResult(meals[0]);
  };

  const fetchMealsByFirstLetter = async (letter) => {
    const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`).then((response) => response.json());
    return convertApiResult(meals[0]);
  };

  return {
    fetchMeals,
    fetchMealCategories,
    fetchMealById,
    fetchMealsByIngredient,
    fetchMealsByName,
    fetchMealsByFirstLetter,
  };
}

export default UseMeal;
