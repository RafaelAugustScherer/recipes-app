import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DetailsContext from './DetailsContext';

function DetailsProvider({ children }) {
  const [ingredientes, setIngredientes] = useState([]);
  const [totalIngredientes, setTotalIngredientes] = useState(0);
  const [refeicao, setRefeicao] = useState({});
  const [recomendadas, setRecomendadas] = useState([]);
  const [id, setId] = useState('');
  const [isInProgress, setIsInProgress] = useState('');

  const contextValue = {
    ingredientes,
    setIngredientes,
    totalIngredientes,
    setTotalIngredientes,
    refeicao,
    setRefeicao,
    recomendadas,
    setRecomendadas,
    isInProgress,
    setIsInProgress,
    id,
    setId,
  };

  return (
    <DetailsContext.Provider value={ contextValue }>
      { children }
    </DetailsContext.Provider>
  );
}

DetailsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DetailsProvider;
