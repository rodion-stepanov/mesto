import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

const editProfilePopup = document.querySelector(".popup");
const editProfileButton = document.querySelector(".profile__edit-button");
const nameInput = document.querySelector(".popup__input_value_name");
const jobInput = document.querySelector(".popup__input_value_description");
const addCardButton = document.querySelector(".profile__button");
const formAddCard = document.querySelector(".popup_card_add");
const avatarButton = document.querySelector(".profile__avatar-button");
const formAvatarEdit = document.querySelector(".popup_avatar_edit");
const profileAvatar = document.querySelector(".profile__avatar");
let cardList;

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
const avatarValidation = new FormValidator(popupSelectors, formAvatarEdit)
//Включение валидации длякаждой формы
editValidation.enableValidation();
addCardValidation.enableValidation();
avatarValidation.enableValidation();

//Класс Апи
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: 'dc1735db-20ec-4583-a516-d92fba380f3a',
    'Content-Type': 'application/json'
  }
});

//Класс изменения аватара
const popupChangeAvatar = new PopupWithForm('.popup_avatar_edit',
  {
    handleFormSubmit: (formData) => {
      popupChangeAvatar.saving(true);
      api.changeAvatar(formData)
        .then((data) => {
          profileAvatar.src = data.avatar;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupChangeAvatar.close();
          popupChangeAvatar.saving(false);
        })
    }
  });

//Класс информации о пользователе
const userInfo = new UserInfo({ profile: ".profile__name", description: ".profile__description" });

api.getInfoUser()
  .then((data) => {
    document.querySelector('.profile__name').textContent = data.name;
    document.querySelector('.profile__description').textContent = data.about;
    document.querySelector('.profile__avatar').src = data.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

avatarButton.addEventListener("click", () => {
  popupChangeAvatar.open();
  popupChangeAvatar.setEventListeners();
  avatarValidation.resetAfterClosePopup();
});

//Класс редактирования профиля
const editForm = new PopupWithForm(".popup",
  {
    handleFormSubmit: (data) => {
      editForm.saving(true);
      api.sendInfoUser(data)
        .then((newData) => {
          userInfo.setUserInfo(newData)
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          editForm.close();
          editForm.saving(false);
        });
    }
  });

//Открытие, закрытие и отправка данных. Попап редактирования профиля 
editProfileButton.addEventListener("click", () => {
  editForm.open()
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().description;
  editForm.setEventListeners();
  editValidation.resetAfterClosePopup()
});

//Открытие, закрытие и отправка данных. Попап добавления карточки
addCardButton.addEventListener("click", () => {
  addCardForm.open();
  addCardForm.setEventListeners();
  addCardValidation.resetAfterClosePopup();
});

//Класс попапа с картинкой
const popupWithImage = new PopupWithImage(".popup_image_open", ".popup__image", ".popup__caption");

//Класс подтверждения удаления карточки 
const popupConfirm = new PopupWithConfirm(".popup_delete_confirm", {
  handleRemoveSubmit: (evt, item, card) => {
    evt.preventDefault();
    api.removeCard(item)
      .then(() => {
        card._element.remove();
        card._element = null;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => popupConfirm.close());
  }
});
popupConfirm.setSubmit();

//Добавление начальных карточек
api.getInitialCards()
  .then((result) => {
    cardList = new Section({
      items: result, renderer: (item) => {
        const card = new Card(item,
          {
            handleCardClick: () =>
              popupWithImage.open(item),
            //Удаление карточки
            handleRemoveClick: () => {
              popupConfirm.open(item, card);
            },
            //Лайки
            handleLikeClick: () => {
              if (card.likeActive()) {
                card.toggleLikeButton();
                api.removeLike(item)
                  .then((item) => {
                    card.likeCounter(item);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                return false;
              }
              else {
                card.toggleLikeButton();
                api.setLike(item)
                  .then((item) => {
                    card.likeCounter(item)
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                return true;
              }
            }
          }, '#card');
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
      }
    }, '.cards');
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

//Добавление новой карточки
const addCardForm = new PopupWithForm(
  ".popup_card_add",
  {
    handleFormSubmit: (formData) => {
      addCardForm.saving(true);
      api.createCard(formData)
        .then((data) => {
          const card = new Card(data,
            {
              handleCardClick: () =>
                popupWithImage.open(data),
              //Удаление карточки
              handleRemoveClick: () => {
                popupConfirm.open(data, card);
              },
              //Лайки
              handleLikeClick: () => {
                if (card.likeActive()) {
                  card.toggleLikeButton();
                  api.removeLike(data)
                    .then((data) => {
                      card.likeCounter(data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  return false;
                }
                else {
                  card.toggleLikeButton();
                  api.setLike(data)
                    .then((data) => {
                      card.likeCounter(data)
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  return true;
                }
              }
            }, '#card');
          const cardElement = card.generateCard();
          cardList.addItem(cardElement);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          addCardForm.close()
          addCardForm.saving(false)
        })
    }
  });