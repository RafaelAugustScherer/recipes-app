import PropTypes from 'prop-types';
import React from 'react';
import clipboardCopy from 'clipboard-copy';
import CardRecomendacao from './CardRecomendacao';
import useFavorite from '../hooks/useFavorite';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function Bebe({ refeicao, recomendadas, id, setShareToast, renderIngredients }) {
  const { favorite, handleFavorite } = useFavorite(id);

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
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => {
          clipboardCopy(window.location.href);
          setShareToast(true);
        } }
      >
        <img src={ shareIcon } alt="share" />
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
        onClick={ () => handleFavorite('bebida') }
      >
        <img src={ favorite ? blackHeartIcon : whiteHeartIcon } alt="favorite" />
      </button>
      <h2>Ingredients</h2>
      { renderIngredients() }
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
              url="bebidas"
            />
          )) }
      </div>
      <button
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        type="button"
      >
        Iniciar Receita
      </button>
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
