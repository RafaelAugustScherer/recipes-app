import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import BotaoShareAndFavorite from './BotaoShareAndFavorite';

function CardRecipes(
  { recipe: { id, name, image, type, area, category, alcoholicOrNot }, index, url },
) {
  return (
    <div className="card card-favorites">
      <Link
        to={ `/${url}/${id}` }
      >
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ name }
          className="card-image"
        />
        <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
        <p data-testid={ `${index}-horizontal-top-text` }>
          {
            type === 'comida' ? (`${area} - ${category}`) : (`${alcoholicOrNot}`)
          }
        </p>
      </Link>
      <BotaoShareAndFavorite id={ id } index={ index } />
    </div>
  );
}

CardRecipes.propTypes = {
  index: PropTypes.number,
  url: PropTypes.string,
  recipe: PropTypes.object,
}.isRequired;

export default CardRecipes;
