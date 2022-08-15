import React, { useState } from 'react';
import {withRouter} from 'react-router';
import { Link } from 'react-router-dom';

function Register(props) {
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
      let { email, password } = formParams;
      props.handleRegister({ email, password })
  }

  return (
   <div className="form">
    <form onSubmit={handleSubmit} className="form__container">
      <h2 className="form__header">Регистрация</h2>
      <input value={formParams.email} onChange={handleChange} placeholder="Email" id="email" required name="email"  className="form__input" type="text"/>
      <input  value={formParams.password} onChange={handleChange} placeholder="Пароль" id="password" required name="password" className="form__input" type="password" autoComplete="on"/>
      <button type="submit" className="form__button_type_submit">Зарегистрироваться</button>
      <p className="form__question">Уже зарегистрированы?
      <Link to="/signin" className="header__link"> Войти</Link></p>
    </form>
  </div>
  )
}

export default withRouter(Register);