import PropTypes from 'prop-types';
import React from 'react';

function Card({ thumb, name, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img data-testid={ `${index}-card-img` } src={ thumb } alt={ name } />
      <p data-testid={ `${index}-card-name` }>{ name }</p>
    </div>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
