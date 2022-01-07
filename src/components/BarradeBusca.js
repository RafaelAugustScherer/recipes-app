import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import useRecipe from '../hooks/UseRecipe';

function BarradeBusca({ comidasOuBebidas }) {
  const INGREDIENTE = 'Ingrediente';
  const NOME = 'Nome';
  const PRIMEIRA_LETRA = 'Primeira Letra';

  const [value, setValue] = useState('');
  const [filter, setFilter] = useState(INGREDIENTE);
  const { comidas, setComidas, bebidas, setBebidas } = useContext(RecipesContext);
  const {
    fetchRecipesByIngredient,
    fetchRecipesByName,
    fetchRecipesByFirstLetter,
  } = useRecipe();
  const history = useHistory();

  const handleSearch = async () => {
    let newSearch = comidasOuBebidas === 'comidas' ? [...comidas] : [...bebidas];
    switch (filter) {
    case INGREDIENTE: {
      newSearch = await fetchRecipesByIngredient(comidasOuBebidas, value);
      break;
    }
    case NOME: {
      newSearch = await fetchRecipesByName(comidasOuBebidas, value);
      break;
    }
    case PRIMEIRA_LETRA: {
      if (value.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
        return null;
      }
      newSearch = await fetchRecipesByFirstLetter(comidasOuBebidas, value);
      break;
    }
    default:
      return null;
    }
    if (!newSearch) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return null;
    }

    if (newSearch.length === 1) {
      history.push(`/${comidasOuBebidas}/${newSearch[0].id}`);
    }

    const MAX_LENGTH = 12;
    if (comidasOuBebidas === 'comidas') {
      setComidas(newSearch.slice(0, MAX_LENGTH));
    } else {
      setBebidas(newSearch.slice(0, MAX_LENGTH));
    }
  };

  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        placeholder="Buscar Receita"
        onChange={ ({ target: { value: newValue } }) => setValue(newValue) }
      />
      <label htmlFor="ingrediente">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          id="ingrediente"
          value={ INGREDIENTE }
          checked={ filter === INGREDIENTE }
          onChange={ () => setFilter(INGREDIENTE) }
        />
      </label>
      Ingrediente
      <label htmlFor="nome">
        <input
          data-testid="name-search-radio"
          type="radio"
          id="nome"
          value={ NOME }
          checked={ filter === NOME }
          onChange={ () => setFilter(NOME) }
        />
        Nome
      </label>
      <label htmlFor="primeira-letra">
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          id="primeira-letra"
          value={ PRIMEIRA_LETRA }
          checked={ filter === PRIMEIRA_LETRA }
          onChange={ () => setFilter(PRIMEIRA_LETRA) }
        />
        Primeira Letra
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleSearch }
      >
        Buscar
      </button>
    </div>
  );
}

BarradeBusca.propTypes = {
  comidasOuBebidas: PropTypes.string,
}.isRequired;

export default BarradeBusca;
