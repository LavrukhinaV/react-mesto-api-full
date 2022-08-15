import {useState, useEffect} from 'react';
import PopupWithForm from './PopupWithForm'

function AddPlacePopup({ onClose, isOpen, onAddPlace }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    setName('');
    setDescription('');
  }, [isOpen])

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      description
    });
  } 

  return(
    <PopupWithForm title="Новое место" name="add-element" isOpen={isOpen} onClose={onClose} buttonText='Создать' onSubmit={handleSubmit}>
      <label className="input__field">
        <input value={name} onChange={handleChangeName} id="title" type="text" required placeholder="Название" className="input__text input__text_type_title" name="name" minLength="2" maxLength="30"/>
        <span id="error-title" className="input__span"></span>
      </label>
      <label className="input__field">
        <input value={description} onChange={handleChangeDescription} id="link" type="url" required placeholder="Ссылка на картинку" className="input__text input__text_type_link" name="link"/>
        <span id="error-link" className="input__span"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;