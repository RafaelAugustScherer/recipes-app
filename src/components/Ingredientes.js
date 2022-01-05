import React, { useContext } from 'react';
import DetailsContext from '../context/DetailsContext';

function Ingredientes() {
  const MAX_INGREDIENT = 20;
  const {
    refeicao,
    setTotalIngredientes,
    ingredientes,
    setIngredientes,
    isInProgress,
  } = useContext(DetailsContext);
  const handleIngredients = (ingredient) => {
    if (ingredientes.includes(ingredient)) {
      setIngredientes(ingredientes.filter((ingrediente) => ingrediente !== ingredient));
    } else {
      setIngredientes([...ingredientes, ingredient]);
    }
  };

  const listOfIngredients = [];
  for (let index = 1; index <= MAX_INGREDIENT; index += 1) {
    const ingredient = refeicao[`strIngredient${index}`];
    const measure = refeicao[`strMeasure${index}`];

    if (ingredient && !isInProgress) {
      const li = (
        <li
          data-testid={ `${index - 1}-ingredient-name-and-measure` }
          key={ ingredient }
        >
          { ingredient }
          { ' - ' }
          { measure }
        </li>
      );
      listOfIngredients.push(li);
    } else if (ingredient) {
      const checkbox = (
        <li key={ ingredient }>
          <input
            type="checkbox"
            data-testid={ `${index - 1}-ingredient-step` }
            onClick={ () => handleIngredients(ingredient) }
          />
          <span>
            { ingredient }
            { ' - ' }
            { measure }
          </span>
        </li>
      );
      listOfIngredients.push(checkbox);
    }
  }
  setTotalIngredientes(listOfIngredients.length);
  return (
    <ul>
      { listOfIngredients.map((el) => el) }
    </ul>
  );
}

export default Ingredientes;
