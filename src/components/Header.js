import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import BarradeBusca from './BarradeBusca';

function Header({ title }) {
  const [isBusca, setBusca] = useState(false);
  const buscaDisponivel = ['Comidas', 'Bebidas', 'Explorar Origem'];

  return (
    <header>
      <Link to="/perfil">
        <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
      </Link>
      <div data-testid="page-title">
        <p>{ title }</p>
      </div>
      { buscaDisponivel.includes(title) && (
        <>
          <button
            type="button"
            src={ searchIcon }
            data-testid="search-top-btn"
            onClick={ () => setBusca(!isBusca) }
          >
            <img src={ searchIcon } alt="profile icon" />
          </button>
          {isBusca && <BarradeBusca />}
        </>
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
