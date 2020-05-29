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
const cardImage = document.querySelector(".cards__image");
const openImage = document.querySelector(".popup_image_open");
const closeImage = document.querySelector(".popup__close-button_image_close");
const popupSaveButton = formAddCard.querySelector(".popup__save-button");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const inputPlaceName = document.querySelector(".popup__user_place_name");
const inputPlaceImage = document.querySelector(".popup__user_place_image");
const cardsSection = document.querySelector('.cards');
const placeTemplate = document.querySelector("#card").content;

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Функция открытия и закрытия попапа добавления карточки
function addCardPopup() {
  formAddCard.classList.toggle("popup_opened");
  if (formAddCard.classList.contains("popup_opened")) {
    inputPlaceName.value = '';
    inputPlaceImage.value = '';
  }
}



//Функция открытия и закрытия попапа редактирования профиля
function profilePopup() {
  editProfilePopup.classList.toggle("popup_opened");
  if (editProfilePopup.classList.contains("popup_opened")) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
  }
}

//Функция отправки в редактировании профиля
function profileSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  profilePopup();
}

//Фунцкия открытия и закрытия картинки
function imagePopup() {
  openImage.classList.toggle("popup_opened");
}

//Открытие и закрытие попапа с редактированием профиля, и отправка данных
editProfileButton.addEventListener("click", profilePopup);
closeProfileButton.addEventListener("click", profilePopup);
formElement.addEventListener("submit", profileSubmitHandler);

//Открытие и закрытие попапа с добавлением карточки
addCardButton.addEventListener("click", addCardPopup);
cardCloseButton.addEventListener("click", addCardPopup);
formAddCard.addEventListener("submit", addCardSubmitHandler);

//закрытие попапа с картинкой
closeImage.addEventListener("click", imagePopup);

//закрытие все попапов по клавише escape
document.addEventListener('keydown', function keyPress(e) {
  if (e.key === "Escape") {
    formAddCard.classList.remove("popup_opened");
    editProfilePopup.classList.remove("popup_opened");
    openImage.classList.remove("popup_opened");
  }
});

//Обработчики
function addEvents(item) {
  item.querySelector('.cards__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__like-button_active');
  });
  item.querySelector('.cards__delete-button').addEventListener('click', function (evt) {
    const card = evt.target.closest('.cards__item');
    card.remove();
  });
  let cardCaption = item.querySelector('.cards__name-caption');
  item.querySelector('.cards__image').addEventListener('click', function (evt) {
    openImage.classList.toggle('popup_opened');
    const cardsImage = evt.target;
    popupImage.src = cardsImage.src;
    popupImage.alt = cardCaption.textContent;
    popupCaption.textContent = cardCaption.textContent;
  });
}

//Функция создания новой карточки
function addNewCard(item) {
  const placeCard = placeTemplate.cloneNode(true);
  placeCard.querySelector('.cards__name-caption').textContent = item.name;
  placeCard.querySelector('.cards__image').src = item.link;
  placeCard.querySelector('.cards__image').alt = item.name;
  addEvents(placeCard);
  cardsSection.prepend(placeCard);
}

//Добавление новой карточки
function addCardSubmitHandler(evt) {
  evt.preventDefault();
  let cardArray = {
    name: "",
    link: "",
  };
  cardArray.name = inputPlaceName.value;
  cardArray.link = inputPlaceImage.value;
  addNewCard(cardArray);
  addCardPopup();
}

//Дбавления карточек из массива
function renderArray() {
  initialCards.forEach(addNewCard);
}

renderArray();