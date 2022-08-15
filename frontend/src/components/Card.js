import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function Card({onCardClick, card, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = card.owner === currentUser._id;
  const hasLike = card.likes.some(i => i === currentUser._id);

 
  
  const cardDeleteButtonClassName = (
    `element__button-delete ${isOwn ? 'element__button-delete_visible' : 'element__button-delete_hidden'}`
  );
  
  const cardLikeButtonClassName = (
    `element__button-like ${hasLike ? 'element__button-like_active' : 'element__button-like_inactive'}`
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLike() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <article className="element">
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <img className="element__image" src={card.link} alt="Фотография места" onClick={handleClick}/>
      <div className="element__description">
        <h2 className="element__title">{card.name}</h2>
        <button className={cardLikeButtonClassName} onClick={handleLike}></button>
        <span className="element__like-count">{card.likes.length}</span>
      </div>
    </article>
  );
}

export default Card;