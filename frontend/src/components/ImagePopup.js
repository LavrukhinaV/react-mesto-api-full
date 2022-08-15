import React from 'react';

function ImagePopup(props) {

  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className="popup__block">
        <img className="popup__image" alt="Фотография места" src={props.card.link || ''}/>
        <h2 className="popup__caption">{props.card.name}</h2>
        <button className="popup__close-btn popup__close-btn_card" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default ImagePopup;