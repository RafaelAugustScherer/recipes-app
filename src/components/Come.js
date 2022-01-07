import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import CardRecomendacao from './CardRecomendacao';
import Ingredientes from './Ingredientes';
import DetailsContext from '../context/DetailsContext';
import BotaoShareAndFavorite from './BotaoShareAndFavorite';

function Come() {
  const { refeicao, recomendadas } = useContext(DetailsContext);
  if (Object.keys(refeicao).length === 0) return null;
  const {
    strMeal,
    strMealThumb,
    strCategory,
    strInstructions,
    strYoutube = '',
  } = refeicao;

  const strYoutubeArray = strYoutube.split('=');
  const newStrYoutube = `https://www.youtube.com/embed/${strYoutubeArray[1]}`;

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ strMealThumb }
        alt="Recipe"
        className="img-details"
      />
      <p data-testid="recipe-title">{ strMeal }</p>
      <p data-testid="recipe-category">{ strCategory }</p>
      <BotaoShareAndFavorite />
      <h2>Ingredients</h2>
      <Ingredientes />
      <h2>Instructions</h2>
      <p data-testid="instructions" className="instructions">{ strInstructions }</p>
      <h2>Video</h2>
      <iframe
        data-testid="video"
        width="200"
        height="300"
        src={ newStrYoutube }
        title={ strMeal }
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
        allowFullScreen
      />
      <h2>Recomendadas</h2>
      <div className="carrossel">
        { recomendadas
          .map(({ strDrinkThumb, strDrink, idDrink }, index) => (
            <CardRecomendacao
              key={ strDrink }
              thumb={ strDrinkThumb }
              name={ strDrink }
              index={ index }
              id={ idDrink }
              url="bebidas"
            />
          )) }
      </div>
    </>
  );
}

Come.propTypes = {
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

export default Come;
