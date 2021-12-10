function UseDrink() {
  const fetchDrinks = async (MAX_LENGTH) => {
    const { drinks } = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=').then((response) => response.json());
    return drinks.slice(0, MAX_LENGTH);
  };

  const fetchDrinkById = async (id) => {
    const { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`).then((response) => response.json());
    return drinks[0];
  };

  return {
    fetchDrinks,
    fetchDrinkById,
  };
}

export default UseDrink;
