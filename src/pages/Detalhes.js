import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import UseRecipe from '../hooks/UseRecipe';
import Come from '../components/Come';
import Bebe from '../components/Bebe';
import BotaoReceita from '../components/BotaoReceita';
import DetailsContext from '../context/DetailsContext';
import RecipesContext from '../context/RecipesContext';

function Detalhes({ match: { url } }) {
  const {
    setRefeicao,
    setIngredientes,
    setRecomendadas,
    setId,
    setIsInProgress } = useContext(DetailsContext);
  const { startLocalStorage } = useContext(RecipesContext);
  let [, comesOuBebes] = url.split('/');
  const [, , urlId, progressUrl] = url.split('/');
  if (comesOuBebes === 'comidas') comesOuBebes = 'comes';
  if (comesOuBebes === 'bebidas') comesOuBebes = 'bebes';

  const MAX_LENGTH = 6;
  const { fetchRecipes, fetchRecipeById } = UseRecipe(MAX_LENGTH);
  /* const [isLoading, setIsLoading] = useState(false); */

  startLocalStorage();

  const getRecipeStatus = () => {
    const { cocktails, meals } = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (comesOuBebes === 'comes' && Object.keys(meals).includes(urlId)) {
      setIngredientes(meals[urlId]);
    } else if (comesOuBebes === 'bebes' && Object.keys(cocktails).includes(urlId)) {
      setIngredientes(cocktails[urlId]);
    }
  };

  const fetchRecipe = async () => {
    /* setIsLoading(true); */
    const newRefeicao = await fetchRecipeById(comesOuBebes, urlId);
    const newRecomendadas = await fetchRecipes(
      comesOuBebes === 'comes' ? 'bebes' : 'comes',
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
      {/* <Toast
        onClose={ () => setShareToast(false) }
        show={ shareToast }
        delay={ 3000 }
        autohide
      >
        <p>Link copiado!</p>
      </Toast> */}
      {
        comesOuBebes === 'comes' ? <Come /> : <Bebe />
      }
      <BotaoReceita url={ url } comesOuBebes={ comesOuBebes } />
    </div>
  );
  /*  ); */
}

Detalhes.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Detalhes;
