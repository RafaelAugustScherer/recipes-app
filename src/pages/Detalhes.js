import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Toast } from 'react-bootstrap';
import UseRecipe from '../hooks/UseRecipe';
import Come from '../components/Come';
import Bebe from '../components/Bebe';

function Detalhes({ match: { url, params: { id } } }) {
  let [, comesOuBebes] = url.split('/');

  if (comesOuBebes === 'comidas') comesOuBebes = 'comes';
  if (comesOuBebes === 'bebidas') comesOuBebes = 'bebes';

  const MAX_LENGTH = 6;
  const { fetchRecipes, fetchRecipeById } = UseRecipe(MAX_LENGTH);
  const [refeicao, setRefeicao] = useState({});
  const [recomendadas, setRecomendadas] = useState([]);
  const [shareToast, setShareToast] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const newRefeicao = await fetchRecipeById(comesOuBebes, id);
      const newRecomendadas = await fetchRecipes(
        comesOuBebes === 'comes' ? 'bebes' : 'comes',
      );
      setRefeicao(newRefeicao);
      setRecomendadas(newRecomendadas);
    };
    fetchData();
  }, []);

  const renderIngredients = () => {
    const MAX_INGREDIENT = 20;

    const listOfIngredients = [];
    for (let index = 1; index <= MAX_INGREDIENT; index += 1) {
      const ingredient = refeicao[`strIngredient${index}`];
      const measure = refeicao[`strMeasure${index}`];

      if (ingredient) {
        const li = (
          <li
            data-testid={ `${index - 1}-ingredient-name-and-measure` }
            key={ ingredient }
          >
            { ingredient }
            { ' - ' }
            { measure }
          </li>
        );
        listOfIngredients.push(li);
      }
    }
    return (
      <ul>
        { listOfIngredients.map((el) => el) }
      </ul>
    );
  };

  const props = {
    refeicao,
    recomendadas,
    id,
    setShareToast,
    renderIngredients,
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
    </div>
  );
}

Detalhes.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Detalhes;
