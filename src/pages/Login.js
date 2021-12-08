import React, { useState } from 'react';
import { useHistory } from 'react-router';

function Login() {
  const history = useHistory();
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const areFieldsValid = () => {
    const { email, password } = login;
    const emailRegex = /[a-z0-9]*@[a-z0-9]*\.[a-z]{2,3}/i;

    const MIN_CHARACTERS = 6;

    return password.length > MIN_CHARACTERS
    && emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    const { email } = login;
    e.preventDefault();

    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));

    history.push('/comidas');
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={ handleSubmit }>
        <input
          data-testid="email-input"
          type="text"
          placeholder="Email"
          onChange={ ({ target: { value } }) => setLogin({ ...login, email: value }) }
          value={ login.email }
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="Senha"
          onChange={ ({ target: { value } }) => setLogin({ ...login, password: value }) }
          value={ login.password }
        />
        <button
          data-testid="login-submit-btn"
          type="submit"
          disabled={ !areFieldsValid() }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
