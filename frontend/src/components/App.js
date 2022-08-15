import {useEffect, useState} from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import '../index.css';
import Login from './Login.js';
import Header from './Header';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip.js'
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as Auth from '../utils/Auth';

import api from '../utils/Api'

function App() {
  const [isPopupEditProfileOpen, setPopupEditProfileOpen] = useState(false)
  const [isPopupEditAvatarOpen, setPopupEditAvatarOpen] = useState(false)
  const [isPopupAddPlaceOpen, setPopupAddPlaceOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isPopupTooltipOpen, setPopupTooltipOpen] = useState(false)

  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState('')

  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false)

  const history = useHistory();
  
  useEffect(() => {
    if (loggedIn) {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([userData, card]) => {
        setCurrentUser(userData);
        setCards(card);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
    }
  }, [loggedIn])

  function handleEditAvatarClick() {
    setPopupEditAvatarOpen(true)
  }

  function handleEditProfileClick() {
    setPopupEditProfileOpen(true)
  }

  function handleAddPlaceClick() {
    setPopupAddPlaceOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setPopupEditProfileOpen(false)
    setPopupEditAvatarOpen(false)
    setPopupAddPlaceOpen(false)
    setSelectedCard({})
    setPopupTooltipOpen(false)
  }

  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => console.log(`Ошибка: ${err}`))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards(prevCards => prevCards.filter(item => item._id !== card._id))
    })
    .catch(err => console.log(`Ошибка: ${err}`))
  }

  function handleUpdateUser(data) {
    const newInfo = { name: data.name, about: data.about }
    api.editProfile(newInfo)
    .then((data) => {
      setCurrentUser(data);
    })
    .then(() => {
      closeAllPopups()
    })
    .catch(err => console.log(`Ошибка: ${err}`))
  }

  function handleUpdateAvatar(data) {
    api.editAvatar ({avatar: data.avatar})
    .then((data) => {
      setCurrentUser(data)
    })
    .then(() => {
      closeAllPopups()
    })
    .catch(err => console.log(`Ошибка: ${err}`))
  }

  function handleAddPlaceSubmit(data) {
    api.addCard({name: data.name, link: data.description})
    .then((newCard) => {
      setCards([newCard, ...cards]); 
    })
    .then(() => {
      closeAllPopups()
    })
    .catch(err => console.log(`Ошибка: ${err}`))
  }

  const handleLogin = ({ email, password }) => {
    Auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          localStorage.setItem('jwtToken', data.token);
          tokenCheck();
        } else {
          setIsSuccess(false)
          setPopupTooltipOpen(true)
        }
      })
      .catch(err => console.log(`Ошибка: ${err}`))
  }

  const handleRegister = ({ email, password }) => {
    return Auth.register(email, password)
    .then((res) => {
      if (res.status === 400 ) {
        setIsSuccess(false)
        setPopupTooltipOpen(true)
      } else {
        history.push('/sign-in')
        setIsSuccess(true)
        setPopupTooltipOpen(true)
      }
    })
    .catch((err)=>{
      setIsSuccess(false)
      setPopupTooltipOpen(true)
      console.log(`Ошибка: ${err}`)
    })
  }

  const tokenCheck = () => {
    const token = localStorage.getItem('jwtToken');
    if (token){
      Auth.getContent(token)
      
      .then((res) => {
        if (res){
          setEmail(res.email)
          setLoggedIn(true);
          history.push('/')
        }
      })
      .catch(err => console.log(`Ошибка: ${err}`))
    }
  }

  const signOut = () => {
    localStorage.removeItem('jwtToken');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <main className="page">
      <>
        <Header loggedIn={loggedIn} handleSignOut={signOut} email={email}/>
        <InfoTooltip
          isOpen={isPopupTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
          success={'Вы успешно зарегистрировались!'}
          error={'Что-то пошло не так! Попробуйте ещё раз.'}
        />
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Main
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Footer/>
          </ProtectedRoute>
          <Route exact path="/sign-in">
              <Login handleLogin={handleLogin} tokenCheck={tokenCheck} />
          </Route>
          <Route exact path="/sign-up">
              <Register handleRegister={handleRegister} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <EditProfilePopup
          isOpen={isPopupEditProfileOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isPopupEditAvatarOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isPopupAddPlaceOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup
          isOpen={ Boolean(selectedCard.name) } 
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </>
    </main>
  </CurrentUserContext.Provider>
  );
}

export default App;
