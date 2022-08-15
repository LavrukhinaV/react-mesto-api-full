import React from 'react';

function PopupWithForm({name, title, children, isOpen, onClose, onSubmit, buttonText}) {

  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
      <button className="popup__close-btn" type="button" aria-label="Закрыть" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form className={`input input_${name}`} onSubmit={onSubmit} name={name}>
          {children}
          <button  type="submit" className="input__submit-btn" aria-label={buttonText}>{buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;