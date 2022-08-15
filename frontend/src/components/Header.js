import React from 'react';
import logo from '../images/Logo.svg';


import { Route, NavLink } from 'react-router-dom';

function Header({loggedIn, handleSignOut, email}) {

  return (
    <header className="header">
      <img className="logo" src={logo} alt="Лого сайта"/>
      {loggedIn ?
         <div className='header__container'>
            <p className='header__email'>{email}</p>
            <button className='header__button' onClick={handleSignOut}>Выйти</button>
          </div>
          : <>
          <Route path='/sign-in'>
            <NavLink to="/sign-up" activeClassName="header__link_none" className="header__link">
              Регистрация
            </NavLink>
          </Route>
          <Route path='/sign-up'>
            <NavLink to="/sign-in" activeClassName="header__link_none" className="header__link">
              Вход
            </NavLink>
          </Route>
        </>
      }
    </header>
  );
}

export default Header;