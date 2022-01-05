import React, { useContext, useEffect, useState, useCallback } from 'react';
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
  const [ingredientsList, setIngredientsList] = useState([]);

  const handleIngredient = (ingredient) => {
    if (ingredientes.includes(ingredient)) {
      setIngredientes(ingredientes.filter((ingrediente) => ingrediente !== ingredient));
    } else {
      setIngredientes([...ingredientes, ingredient]);
    }
  };

  const fillIngredientsList = useCallback(() => {
    setIngredientsList([]);
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
        setIngredientsList((prevList) => [...prevList, li]);
      } else if (ingredient) {
        const checkbox = (
          <li key={ ingredient } data-testid={ `${index - 1}-ingredient-step` }>
            <input
              type="checkbox"
              onClick={ () => handleIngredient(ingredient) }
            />
            <span>
              { ingredient }
              { ' - ' }
              { measure }
            </span>
          </li>
        );
        setIngredientsList((prevList) => [...prevList, checkbox]);
      }
    }
    // eslint-disable-next-line
  }, [isInProgress, ingredientes]);

  useEffect(() => {
    fillIngredientsList();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fillIngredientsList();
  }, [setIngredientsList, fillIngredientsList]);

  useEffect(() => {
    setTotalIngredientes(ingredientsList.length);
  }, [ingredientsList, setTotalIngredientes]);

  return (
    <ul>
      { ingredientsList.map((el) => el) }
    </ul>
  );
}

export default Ingredientes;
