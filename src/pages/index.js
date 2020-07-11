import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

const editProfilePopup = document.querySelector(".popup");
const editProfileButton = document.querySelector(".profile__edit-button");
const nameInput = document.querySelector(".popup__input_value_name");
const jobInput = document.querySelector(".popup__input_value_description");
const addCardButton = document.querySelector(".profile__button");
const formAddCard = document.querySelector(".popup_card_add");

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

//Классы форм
const editValidation = new FormValidator(popupSelectors, editProfilePopup);
const addCardValidation = new FormValidator(popupSelectors, formAddCard);
//Включение валидации длякаждой формы
editValidation.enableValidation();
addCardValidation.enableValidation();

//Класс формы добавления карточки
const addCardForm = new PopupWithForm(
  ".popup_card_add",
  {
    handleFormSubmit: (formData) => {
      const card = new Card(formData,
        {
          handleCardClick: () =>
            popupWithImage.open(formData)
        }, '#card');
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
      addCardForm.close();
    }
  });

const userInfo = new UserInfo({ profile: ".profile__name", description: ".profile__description" });

//Класс формы редактирования профиля
const editForm = new PopupWithForm(".popup",
  {
    handleFormSubmit: (formData) => {
      userInfo.setUserInfo(formData);
    }
  });

//Открытие, закрытие и отправка данных. Попап редактирования профиля 
editProfileButton.addEventListener("click", () => {
  editForm.open()
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().description;
  editForm.setEventListeners();
  editValidation.resetAfterClosePopup();
});

//Открытие, закрытие и отправка данных. Попап добавления карточки
addCardButton.addEventListener("click", () => {
  addCardForm.open();
  addCardForm.setEventListeners();
  addCardValidation.resetAfterClosePopup();
});
const popupWithImage = new PopupWithImage(".popup_image_open");

//Загрузка начальных карточек
const cardList = new Section({
  items: initialCards, renderer: (item) => {
    const card = new Card(item,
      {
        handleCardClick: () =>
          popupWithImage.open(item)
      }, '#card');
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, '.cards');

cardList.renderItems();