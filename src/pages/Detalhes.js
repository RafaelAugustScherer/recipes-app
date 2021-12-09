import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Card from '../components/Card';

function Detalhes({ match: { url } }) {
  const [, comesOuBebes, id] = url.split('/');

  const [refeicao, setRefeicao] = useState({});
  const [recomendadas, setRecomendadas] = useState([]);

  const fetchRecomendadas = async () => {
    let recomendacoes = [];
    if (comesOuBebes === 'comidas') {
      const { drinks } = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=').then((response) => response.json());
      recomendacoes = drinks;
    } else {
      const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=').then((response) => response.json());
      recomendacoes = meals;
    }
    const MAX_LENGTH = 6;
    setRecomendadas(recomendacoes.slice(0, MAX_LENGTH));
  };

  useEffect(() => {
    const fetchRefeicao = async () => {
      if (comesOuBebes === 'comidas') {
        const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((response) => response.json());
        setRefeicao(meals[0]);
      } else {
        const newRefeicao = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`).then((response) => response.json());
        setRefeicao(newRefeicao[0]);
      }
    };
    fetchRefeicao();
    fetchRecomendadas();
  }, []);

  const renderCome = () => {
    if (Object.keys(refeicao).length === 0) return null;
    const {
      strMeal,
      strMealThumb,
      strCategory,
      strInstructions,
      strYoutube,
    } = refeicao;
    const strYoutubeArray = strYoutube.split('=');
    const newStrYoutube = `https://www.youtube.com/embed/${strYoutubeArray[1]}`;
    console.log(newStrYoutube);
    // const [, youtubeId] = strYoutube.split('=');
    return (
      <>
        <img
          data-testid="recipe-photo"
          src={ strMealThumb }
          alt="Recipe"
        />
        <p data-testid="recipe-title">{ strMeal }</p>
        <p data-testid="recipe-category">{ strCategory }</p>
        <button data-testid="share-btn" type="button">
          <img src={ shareIcon } alt="share" />
        </button>
        <button data-testid="favorite-btn" type="button">
          <img src={ whiteHeartIcon } alt="share" />
        </button>
        <h2>Ingredients</h2>

        <h2>Instructions</h2>
        <p data-testid="instructions">{ strInstructions }</p>
        <h2>Video</h2>
        <iframe
          width="200"
          height="300"
          src={ newStrYoutube }
          title={ strMeal }
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
        />
        { /* thumb, name, index, url, id */ }
        <h2>Recomendadas</h2>
        { recomendadas
          .map(({ strMealThumb: innerMealThumb, strMeal: innerMeal, idMeal }, index) => (
            <Card
              data-testid={ `${index}-recomendation-card` }
              key={ innerMeal }
              thumb={ innerMealThumb }
              name={ innerMeal }
              index={ index }
              id={ idMeal }
              url="comidas"
            />
          )) }
        <button
          data-testid="start-recipe-btn"
          type="button"
        >
          Iniciar Receita
        </button>
      </>
    );
  };

  return (
    <div>
      Página de Detalhes
      { comesOuBebes === 'comidas' && renderCome() }
    </div>
  );
}

Detalhes.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Detalhes;
