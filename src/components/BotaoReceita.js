import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import DetailsContext from '../context/DetailsContext';

function BotaoReceita({ url }) {
  const [progresso] = useState('não iniciado');
  const { ingredientes, totalIngredientes, isInProgress } = useContext(DetailsContext);
  const history = useHistory();
  return (
    <div>
      {
        !isInProgress ? (
          progresso !== 'finalizado' && (
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="start-recipe-btn"
              onClick={ () => history.push(`${url}/in-progress`) }
            >
              {
                progresso === 'não iniciado' ? 'Iniciar Receita' : 'Continuar Receita'
              }
            </button>
          )
        ) : (
          <button
            type="button"
            data-testid="finish-recipe-btn"
            className="start-recipe-btn"
            onClick={ () => history.push('/receitas-feitas') }
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
  isInProgress: PropTypes.string,
  progresso: PropTypes.string,
  url: PropTypes.string,
}.isRequired;

export default BotaoReceita;
