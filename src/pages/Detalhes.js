import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Toast } from 'react-bootstrap';
import UseRecipe from '../hooks/UseRecipe';
import Come from '../components/Come';
import Bebe from '../components/Bebe';
import BotaoReceita from '../components/BotaoReceita';
import DetailsContext from '../context/DetailsContext';

function Detalhes({ match: { url } }) {
  const {
    setRefeicao,
    setRecomendadas,
    setId,
    setIsInProgress } = useContext(DetailsContext);
  let [, comesOuBebes] = url.split('/');
  const [, , urlId, progressUrl] = url.split('/');
  setIsInProgress(progressUrl);
  setId(urlId);
  if (comesOuBebes === 'comidas') comesOuBebes = 'comes';
  if (comesOuBebes === 'bebidas') comesOuBebes = 'bebes';

  const MAX_LENGTH = 6;
  const { fetchRecipes, fetchRecipeById } = UseRecipe(MAX_LENGTH);
  const [shareToast, setShareToast] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const newRefeicao = await fetchRecipeById(comesOuBebes, urlId);
      const newRecomendadas = await fetchRecipes(
        comesOuBebes === 'comes' ? 'bebes' : 'comes',
      );
      setRefeicao(newRefeicao);
      setRecomendadas(newRecomendadas);
    };
    fetchData();
  }, []);

  const props = {
    setShareToast,
  };

  return (
    <div>
      <Toast
        onClose={ () => setShareToast(false) }
        show={ shareToast }
        delay={ 3000 }
        autohide
      >
        <p>Link copiado!</p>
      </Toast>
      { comesOuBebes === 'comes' ? <Come { ...props } /> : <Bebe { ...props } />}
      <BotaoReceita
        url={ url }
      />
    </div>
  );
}

Detalhes.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Detalhes;
