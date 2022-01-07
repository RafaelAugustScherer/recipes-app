import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DetailsContext from '../context/DetailsContext';

function BotaoReceita({ url, comidasOuBebidas }) {
  const {
    id,
    ingredientes,
    refeicao,
    totalIngredientes,
    isInProgress,
    mealsOrCocktails,
  } = useContext(DetailsContext);
  const history = useHistory();

  const NOT_STARTED = 'não iniciado';
  const STARTED = 'iniciado';
  const FINISHED = 'finalizado';

  const [progresso, setProgresso] = useState(NOT_STARTED);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (doneRecipes.some(({ id: doneId }) => doneId === id)) {
      setProgresso(FINISHED);
    } else if (inProgressRecipes[mealsOrCocktails()]
    && Object.keys(inProgressRecipes[mealsOrCocktails()]).includes(id)) {
      setProgresso(STARTED);
    } else {
      setProgresso(NOT_STARTED);
    }
  }, [id, mealsOrCocktails]);

  const handleStart = () => {
    const currentStatus = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (!Object.keys(currentStatus[mealsOrCocktails()]).includes(id)) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(
        { ...currentStatus,
          [mealsOrCocktails()]: { ...currentStatus[mealsOrCocktails()], [id]: [] } },
      ));
    }
    setProgresso(STARTED);
    history.push(`${url}/in-progress`);
  };

  const handleFinish = () => {
    const prevDone = JSON.parse(localStorage.getItem('doneRecipes'));
    const prevInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

    const doneDate = Date.now();
    const {
      name,
      image,
      alcoholicOrNot,
      strArea: area,
      strCategory: category,
      strTags: tags = '' } = refeicao;

    const type = comidasOuBebidas === 'comidas' ? 'comida' : 'bebida';

    const newDone = {
      id,
      name,
      image,
      type,
      area,
      category,
      tags,
      alcoholicOrNot,
      doneDate,
    };
    localStorage.setItem('doneRecipes', JSON.stringify([...prevDone, newDone]));

    delete prevInProgress[mealsOrCocktails()][id];
    localStorage.setItem('inProgressRecipes', JSON.stringify(prevInProgress));

    history.push('/receitas-feitas');
  };

  return (
    <div>
      {
        !isInProgress ? (
          progresso !== FINISHED && (
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="start-recipe-btn"
              onClick={ () => handleStart() }
            >
              {
                progresso === NOT_STARTED ? 'Iniciar Receita' : 'Continuar Receita'
              }
            </button>
          )
        ) : (
          <button
            type="button"
            data-testid="finish-recipe-btn"
            className="start-recipe-btn"
            onClick={ () => handleFinish() }
            disabled={ ingredientes.length !== totalIngredientes }
          >
            Finalizar receita
          </button>
        )
      }
    </div>
  );
}

BotaoReceita.propTypes = {
  comidasOuBebidas: PropTypes.string,
  url: PropTypes.string,
}.isRequired;

BotaoReceita.propTypes = {
  isInProgress: PropTypes.string,
  progresso: PropTypes.string,
  url: PropTypes.string,
}.isRequired;

export default BotaoReceita;
