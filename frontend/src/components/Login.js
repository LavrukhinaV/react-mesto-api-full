import React, { useState } from 'react';
import {withRouter} from 'react-router';

function Login(props) {
  const [formParams, setFormParams] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleLogin({ email: formParams.email, password: formParams.password })
  }

  return (
   <div className="form">
    <form onSubmit={handleSubmit} className="form__container">
      <h1 className="form__header">Вход</h1>
      <input value={formParams.email} onChange={handleChange} placeholder="Email" id="email" required name="email"  className="form__input" type="text"/>
      <input value={formParams.password} onChange={handleChange} placeholder="Пароль" id="password" required name="password" className="form__input" type="password" autoComplete="on"/>
      <button type="submit" className="form__button_type_submit">Войти</button>
    </form>
  </div>
  )
}

export default withRouter(Login);