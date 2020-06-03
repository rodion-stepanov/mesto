const editProfilePopup = document.querySelector(".popup");
const editProfileButton = document.querySelector(".profile__edit-button");
const closeProfileButton = document.querySelector(".popup__close-button");
const nameInput = document.querySelector(".popup__user_value_name");
const jobInput = document.querySelector(".popup__user_value_description");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const formElement = document.querySelector(".popup__container");
const addCardButton = document.querySelector(".profile__button");
const formAddCard = document.querySelector(".popup_card_add");
const cardCloseButton = document.querySelector(".popup__close-button_card_close");
const openImage = document.querySelector(".popup_image_open");
const closeImage = document.querySelector(".popup__close-button_image_close");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const inputPlaceName = document.querySelector(".popup__user_place_name");
const inputPlaceImage = document.querySelector(".popup__user_place_image");
const cardsSection = document.querySelector('.cards');
const placeTemplate = document.querySelector("#card").content;

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

//закрытие все попапов по клавише escape
function keyPress(e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//Функция открытия попапа
function openPopup(elem) {
  elem.classList.add("popup_opened");
  document.addEventListener('keydown', keyPress);
}

//Функция закрытия попапа
function closePopup(elem) {
  elem.classList.remove("popup_opened");
  document.removeEventListener('keydown', keyPress);
}

//Функция отправки в редактировании профиля
function profileSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editProfilePopup);
}

//Обработчики
function setCardEventListeners(item) {
  item.querySelector('.cards__like-button').addEventListener('click', (evt) => 
    evt.target.classList.toggle('cards__like-button_active'));
  item.querySelector('.cards__delete-button').addEventListener('click', function (evt) {
    const card = evt.target.closest('.cards__item');
    card.remove();
  });
  item.querySelector('.cards__image').addEventListener('click', function (evt) {
    const cardImage = evt.target;
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.textContent = cardImage.alt;
    openPopup(openImage);
  });
}

//Функция создания новой карточки
function addNewCard(item) {
  const placeCard = placeTemplate.cloneNode(true);
  placeCard.querySelector('.cards__name-caption').textContent = item.name;
  const newCardImage = placeCard.querySelector('.cards__image')
  newCardImage.src = item.link;
  newCardImage.alt = item.name;
  setCardEventListeners(placeCard);
  return placeCard
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
  renderCard(newCard);
  closePopup(formAddCard);
}

//Добавление карточек из массива
function renderArray(item) {
  initialCards.forEach(item);
}

//Добавление карточек на страницу
function renderCard(card) {
  cardsSection.prepend(addNewCard(card));
}

//Открытие, закрытие и отправка данных. Попап редактирования профиля 
editProfileButton.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(editProfilePopup);
});
closeProfileButton.addEventListener("click", () =>
  closePopup(editProfilePopup));
formElement.addEventListener("submit", profileSubmitHandler);

//Открытие, закрытие и отправка данных. Попап добавления карточки
addCardButton.addEventListener("click", function () {
  inputPlaceName.value = '';
  inputPlaceImage.value = '';
  openPopup(formAddCard);
});
cardCloseButton.addEventListener("click", () =>
  closePopup(formAddCard));
formAddCard.addEventListener("submit", addCardSubmitHandler);

//Закрытие попапа с картинкой
closeImage.addEventListener("click", () =>
  closePopup(openImage));

renderArray(renderCard);