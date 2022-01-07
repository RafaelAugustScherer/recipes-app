import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import DetailsContext from '../context/DetailsContext';
import useFavorite from '../hooks/useFavorite';

function BotaoShareAndFavorite({ id: propId, index }) {
  const { id: contextId, mealsOrCocktails, setShareToast } = useContext(DetailsContext);
  const id = contextId || propId;
  const { favorite, handleFavorite } = useFavorite(id);
  let testIdShareBtn = 'share-btn';
  let testIdFavoriteBtn = 'favorite-btn';
  if (typeof index === 'number') {
    testIdShareBtn = `${index}-horizontal-share-btn`;
    testIdFavoriteBtn = `${index}-horizontal-favorite-btn`;
  }
  return (
    <>
      <button
        type="button"
        onClick={ () => {
          const { hostname, protocol } = window.location;
          const urlType = mealsOrCocktails() === 'meals' ? 'comidas' : 'bebidas';
          clipboardCopy(`${protocol}//${hostname}:3000/${urlType}/${id}`);
          setShareToast(true);
        } }
      >
        <img data-testid={ testIdShareBtn } src={ shareIcon } alt="share" />
      </button>
      <button
        type="button"
        onClick={ mealsOrCocktails() === 'meals'
          ? () => handleFavorite('comida') : () => handleFavorite('bebida') }
      >
        <img
          data-testid={ testIdFavoriteBtn }
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
          alt="favorite"
        />
      </button>
    </>
  );
}

BotaoShareAndFavorite.propTypes = {
  setShareToast: PropTypes.func,
}.isRequired;

export default BotaoShareAndFavorite;
