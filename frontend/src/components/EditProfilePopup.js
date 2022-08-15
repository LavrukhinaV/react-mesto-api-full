import {useEffect, useState, useContext} from 'react';
import PopupWithForm from './PopupWithForm'
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function EditProfilePopup({ onClose, isOpen, onUpdateUser }) {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
    <PopupWithForm title="Редактировать профиль" name="edit-profile" isOpen={isOpen} onClose={onClose} buttonText='Сохранить' onSubmit={handleSubmit}>
      <input value={name} onChange={handleChangeName} id="name" type="text" required placeholder="Ваше имя" className="input__text input__text_type_name" name="name" minLength="2" maxLength="40"/>
      <span id="error-name" className="input__span"></span>
      <input value={description} onChange={handleChangeDescription} id="job" type="text" required placeholder="Ваш род деятельности" className="input__text input__text_type_job" name="profession" minLength="2" maxLength="200"/>
      <span id="error-job" className="input__span"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;