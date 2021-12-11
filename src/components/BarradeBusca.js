import React, { useState, useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import UseRecipe from '../hooks/UseRecipe';

function BarradeBusca({ match: { url } }) {
  const INGREDIENTE = 'Ingrediente';
  const NOME = 'Nome';
  const PRIMEIRA_LETRA = 'Primeira Letra';

  let urlArray = url.split('/');
  const comesOuBebes = urlArray.includes('comidas') ? 'comes' : 'bebes';

  const [value, setValue] = useState('');
  const [filter, setFilter] = useState(INGREDIENTE);
  const { setFood } = useContext(RecipesContext);
  const { fetchRecipesByIngredient } = UseRecipe();

  const handleSearch = async () => {
    switch (filter) {
    case INGREDIENTE: {
      const food = await fetchRecipesByIngredient('comes', value);
      setFood(food);
    }
      break;
    default:
      return 0;
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
          onClick={ () => setFilter(INGREDIENTE) }
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
          onClick={ () => setFilter(NOME) }
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
          onClick={ () => setFilter(PRIMEIRA_LETRA) }
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

export default BarradeBusca;
