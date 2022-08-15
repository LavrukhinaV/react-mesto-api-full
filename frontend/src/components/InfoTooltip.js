import React from 'react';

function InfoTooltip(props) {

  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button className="popup__close-btn" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
        
        <div className={props.isSuccess ? 'popup__success' : 'popup__failed'}></div>
        <h2 className="popup__title">{props.isSuccess ? props.success : props.error}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;