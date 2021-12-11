import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import UseRecipe from '../hooks/UseRecipe';

function BarradeBusca({ comesOuBebes }) {
  const INGREDIENTE = 'Ingrediente';
  const NOME = 'Nome';
  const PRIMEIRA_LETRA = 'Primeira Letra';

  const [value, setValue] = useState('');
  const [filter, setFilter] = useState(INGREDIENTE);
  const { comes, setComes, bebes, setBebes } = useContext(RecipesContext);
  const {
    fetchRecipesByIngredient,
    fetchRecipesByName,
    fetchRecipesByFirstLetter,
  } = UseRecipe();

  const handleSearch = async () => {
    let newFood = comesOuBebes === 'comes' ? [...comes] : [...bebes];
    switch (filter) {
    case INGREDIENTE: {
      newFood = await fetchRecipesByIngredient(comesOuBebes, value);
      break;
    }
    case NOME: {
      newFood = await fetchRecipesByName(comesOuBebes, value);
      break;
    }
    case PRIMEIRA_LETRA: {
      if (value.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
        return null;
      }
      newFood = await fetchRecipesByFirstLetter(comesOuBebes, value);
      break;
    }
    default:
      return null;
    }
    if (comesOuBebes === 'comes') setComes(newFood);
    else setBebes(newFood);
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
  comesOuBebes: PropTypes.string,
}.isRequired;

export default BarradeBusca;
