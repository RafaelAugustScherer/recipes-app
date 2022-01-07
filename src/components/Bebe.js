import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import CardRecomendacao from './CardRecomendacao';
import DetailsContext from '../context/DetailsContext';
import Ingredientes from './Ingredientes';
import BotaoShareAndFavorite from './BotaoShareAndFavorite';

function Bebe() {
  const { refeicao, recomendadas } = useContext(DetailsContext);
  if (Object.keys(refeicao).length === 0) return null;
  const {
    strDrink,
    strDrinkThumb,
    strCategory,
    strInstructions,
    strAlcoholic,
  } = refeicao;

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ strDrinkThumb }
        alt="Recipe"
      />
      <p data-testid="recipe-title">{ strDrink }</p>
      <p data-testid="recipe-category">{ `${strCategory} ${strAlcoholic}` }</p>
      <BotaoShareAndFavorite />
      <h2>Ingredients</h2>
      <Ingredientes />
      <h2>Instructions</h2>
      <p data-testid="instructions">{ strInstructions }</p>
      <h2>Recomendadas</h2>
      <div className="carrossel">
        { recomendadas
          .map(({ strMealThumb, strMeal, idMeal }, index) => (
            <CardRecomendacao
              key={ strMeal }
              thumb={ strMealThumb }
              name={ strMeal }
              index={ index }
              id={ idMeal }
              url="comidas"
            />
          )) }
      </div>
    </>
  );
}

Bebe.propTypes = {
  id: PropTypes.string,
  recomendadas: PropTypes.arrayOf(PropTypes.object),
  refeicao: PropTypes.shape({
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strYoutube: PropTypes.string,
  }),
}.isRequired;

export default Bebe;
