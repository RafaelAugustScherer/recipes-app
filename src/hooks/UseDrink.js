function UseDrink() {
  const convertApiResult = (drink) => {
    const { idDrink: id, strDrink: name, strDrinkThumb: image, strAlcoholic } = drink;
    return { id, name, image, alcoholicOrNot: strAlcoholic, ...drink };
  };

  const fetchDrinks = async (maxLength) => {
    let { drinks } = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=').then((response) => response.json());
    drinks = drinks.map((drink) => convertApiResult(drink));
    return drinks.slice(0, maxLength);
  };

  const fetchDrinkCategories = async (maxLength) => {
    const { drinks } = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list').then((response) => response.json());
    return drinks.map(({ strCategory }) => strCategory).slice(0, maxLength);
  };

  const fetchDrinkById = async (id) => {
    const { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`).then((response) => response.json());
    return convertApiResult(drinks[0]);
  };

  const fetchDrinksByIngredient = async (ingredient) => {
    let { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`).then((response) => response.json());
    drinks = drinks ? drinks.map((drink) => convertApiResult(drink)) : null;
    return drinks;
  };

  const fetchDrinksByName = async (name) => {
    let { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`).then((response) => response.json());
    drinks = drinks ? drinks.map((drink) => convertApiResult(drink)) : null;
    return drinks;
  };

  const fetchDrinksByFirstLetter = async (letter) => {
    let { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`).then((response) => response.json());
    drinks = drinks ? drinks.map((drink) => convertApiResult(drink)) : null;
    return drinks;
  };

  return {
    fetchDrinks,
    fetchDrinkCategories,
    fetchDrinkById,
    fetchDrinksByIngredient,
    fetchDrinksByName,
    fetchDrinksByFirstLetter,
  };
}

export default UseDrink;
