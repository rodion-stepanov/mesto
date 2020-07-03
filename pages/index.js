import { Card } from '../components/Card.js';
import { closePopup, openPopup } from '../scripts/utils.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import {Popup} from '../components/Popup.js';
import {PopupWithImage} from '../components/PopupWithImage.js';

const editProfilePopup = document.querySelector(".popup");
const editProfileButton = document.querySelector(".profile__edit-button");
const closeProfileButton = document.querySelector(".popup__close-button");
const nameInput = document.querySelector(".popup__input_value_name");
const jobInput = document.querySelector(".popup__input_value_description");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const formElement = document.querySelector(".popup__container");
const addCardButton = document.querySelector(".profile__button");
const formAddCard = document.querySelector(".popup_card_add");
const cardCloseButton = document.querySelector(".popup__close-button_card_close");
const openImage = document.querySelector(".popup_image_open");
const closeImage = document.querySelector(".popup__close-button_image_close");
const inputPlaceName = document.querySelector(".popup__input_place_name");
const inputPlaceImage = document.querySelector(".popup__input_place_image");
const cardsSection = document.querySelector('.cards');

const initialCards = [
  {
    name: 'За МКАД',
    link: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1054&q=80'
  },
  {
    name: 'Челябинская область',
    link: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
  },
  {
    name: 'Крымский мост',
    link: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
  },
  {
    name: 'Российская экономика',
    link: 'https://images.unsplash.com/photo-1512351735230-a07ebdf5b5e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80'
  },
  {
    name: 'Омские дворы',
    link: 'https://images.unsplash.com/photo-1523652615028-87da4d4427b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
  },
  {
    name: 'Бибирево',
    link: 'https://images.unsplash.com/photo-1566230724840-0fe03c62884d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
  }
];

const popupSelectors = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const editValidation = new FormValidator(popupSelectors, editProfilePopup);
const addCardValidation = new FormValidator(popupSelectors, formAddCard);
editValidation.enableValidation();
addCardValidation.enableValidation();

//Функция отправки в редактировании профиля
function profileSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editProfilePopup);
}

//Добавление новой карточки
function addCardSubmitHandler(evt) {
  evt.preventDefault();
  const newCard = {
    name: "",
    link: "",
  };
  newCard.name = inputPlaceName.value;
  newCard.link = inputPlaceImage.value;
  const card = new Card(newCard, '#card');
  cardsSection.prepend(card.generateCard());
  closePopup(formAddCard);
}

//Открытие, закрытие и отправка данных. Попап редактирования профиля 
editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  editValidation.resetAfterClosePopup();
  openPopup(editProfilePopup);
});
closeProfileButton.addEventListener("click", () =>
  closePopup(editProfilePopup));
formElement.addEventListener("submit", profileSubmitHandler);

//Открытие, закрытие и отправка данных. Попап добавления карточки
addCardButton.addEventListener("click", () => {
  inputPlaceName.value = '';
  inputPlaceImage.value = '';
  addCardValidation.resetAfterClosePopup();
  openPopup(formAddCard);
});
cardCloseButton.addEventListener("click", () =>
  closePopup(formAddCard));
formAddCard.addEventListener("submit", addCardSubmitHandler);

//Закрытие попапа с картинкой
closeImage.addEventListener("click", () =>
  closePopup(openImage));

//Загрузка начальных карточек
// initialCards.forEach((item) => {
//   const card = new Card(item, '#card');
//   const cardElement = card.generateCard();
//   cardsSection.append(cardElement);
// });

//Загрузка начальных карточек
const cardList = new Section({
  items: initialCards, renderer: (item) => {
    const card = new Card(item, {handleCardClick: (item) => {
      const popupWithImage = new PopupWithImage(item);
      popupWithImage.open();
    }
  },'#card');
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, '.cards');

cardList.renderItems();