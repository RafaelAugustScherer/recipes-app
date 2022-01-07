import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import DetailsContext from '../context/DetailsContext';
import useFavorite from '../hooks/useFavorite';

function BotaoShareAndFavorite({ id: propId }) {
  const { id: contextId, mealsOrCocktails, setShareToast } = useContext(DetailsContext);
  const id = contextId || propId;
  console.log(id);
  const { favorite, handleFavorite } = useFavorite(id);

  return (
    <>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => {
          const { hostname, protocol } = window.location;
          clipboardCopy(`${protocol}//${hostname}:3000/comidas/${id}`);
          setShareToast(true);
        } }
      >
        <img src={ shareIcon } alt="share" />
      </button>
      <button
        type="button"
        onClick={ mealsOrCocktails() === 'meals'
          ? () => handleFavorite('comida') : () => handleFavorite('bebida') }
      >
        <img
          data-testid="favorite-btn"
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
