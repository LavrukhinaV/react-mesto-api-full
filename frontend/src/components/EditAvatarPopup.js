import {useRef, useEffect} from 'react';
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup({ onClose, isOpen, onUpdateAvatar} ) {

  const textInput = useRef(null)

  useEffect(() => {
    textInput.current.value = '';
  }, [isOpen]); 
  
  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: textInput.current.value
    });
  } 
  
  return(
  <PopupWithForm
    title="Обновить аватар" name="edit-avatar" isOpen={isOpen} onClose={onClose} buttonText='Сохранить' onSubmit={handleSubmit}>
    <label className="input__field">
      <input ref={textInput}  id="avatar-link" type="url" required placeholder="Ссылка на картинку" className="input__text input__text_type_avatar" name="link"/>
      <span id="error-avatar-link" className="input__span"></span>
    </label>
  </PopupWithForm>
  )
}

export default EditAvatarPopup