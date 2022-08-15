import React from 'react';
import Card from './Card'
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-container">
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" onClick={props.onEditAvatar}/>
          </div>
          <div className="profile__profile-info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__job">{currentUser.about}</p>
            <button className="profile__button-edit" type="button" aria-label="изменить информацию в профиле" onClick={props.onEditProfile}/>
          </div>
        </div>
        <button className="profile__button-add" type="button" aria-label="добавить изображение в галерею" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        {props.cards?.map((card) => 
         (<Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>)
        )}
      </section>
    </main>
  );
}

export default Main;