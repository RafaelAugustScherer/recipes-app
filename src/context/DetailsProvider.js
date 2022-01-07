import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import DetailsContext from './DetailsContext';

function DetailsProvider({ children }) {
  const [ingredientes, setIngredientes] = useState([]);
  const [totalIngredientes, setTotalIngredientes] = useState(0);
  const [refeicao, setRefeicao] = useState({});
  const [recomendadas, setRecomendadas] = useState([]);
  const [id, setId] = useState('');
  const [isInProgress, setIsInProgress] = useState('');
  const [shareToast, setShareToast] = useState(false);

  const mealsOrCocktails = useCallback(() => {
    // const { meals, cocktails } = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (Object.keys(refeicao).length === 0) return {};
    if (refeicao.strMeal) return 'meals';
    return 'cocktails';
  }, [refeicao]);

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
    mealsOrCocktails,
    shareToast,
    setShareToast,
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
