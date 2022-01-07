import React, { useEffect, useContext } from 'react';
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
    setIngredientes,
    setRecomendadas,
    setId,
    setIsInProgress,
    shareToast,
    setShareToast } = useContext(DetailsContext);
  const [, comidasOuBebidas, urlId, progressUrl] = url.split('/');

  const MAX_LENGTH = 6;
  const { fetchRecipes, fetchRecipeById } = UseRecipe(MAX_LENGTH);
  /* const [isLoading, setIsLoading] = useState(false); */

  const startLocalStorage = () => {
    if (!localStorage.getItem('inProgressRecipes')) {
      localStorage
        .setItem('inProgressRecipes', JSON.stringify({ cocktails: {}, meals: {} }));
    }
    if (!localStorage.getItem('doneRecipes')) {
      localStorage
        .setItem('doneRecipes', JSON.stringify([]));
    }
  };
  startLocalStorage();

  const getRecipeStatus = () => {
    const { cocktails, meals } = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (comidasOuBebidas === 'comidas' && Object.keys(meals).includes(urlId)) {
      setIngredientes(meals[urlId]);
    } else if (comidasOuBebidas === 'bebes' && Object.keys(cocktails).includes(urlId)) {
      setIngredientes(cocktails[urlId]);
    }
  };

  const fetchRecipe = async () => {
    /* setIsLoading(true); */
    const newRefeicao = await fetchRecipeById(comidasOuBebidas, urlId);
    const newRecomendadas = await fetchRecipes(
      comidasOuBebidas === 'comidas' ? 'bebidas' : 'comidas',
    );
    /* setIsLoading(false); */
    setRefeicao(newRefeicao);
    setRecomendadas(newRecomendadas);
  };

  useEffect(() => {
    fetchRecipe();
    getRecipeStatus();
    setIsInProgress(progressUrl);
    setId(urlId);

    // eslint-disable-next-line
  }, [url]);

  useEffect(() => {
    setIsInProgress(progressUrl);
  }, [progressUrl, setIsInProgress]);

  return (
    /* isLoading ? (
      <p>Loading...</p>
    ) : ( */
    <div>
      <Toast
        onClose={ () => setShareToast(false) }
        show={ shareToast }
        delay={ 3000 }
        autohide
      >
        <p>Link copiado!</p>
      </Toast>
      {
        comidasOuBebidas === 'comidas' ? <Come /> : <Bebe />
      }
      <BotaoReceita url={ url } comidasOuBebidas={ comidasOuBebidas } />
    </div>
  );
  /*  ); */
}

Detalhes.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Detalhes;
