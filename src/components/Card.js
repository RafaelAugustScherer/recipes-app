import PropTypes from 'prop-types';
import React from 'react';

function Card({ thumb, name }) {
  return (
    <div>
      <img src={ thumb } alt={ name } />
      <p>{ name }</p>
    </div>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
};

export default Card;
