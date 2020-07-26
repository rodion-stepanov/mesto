export class Card {
  constructor(data, { handleCardClick, handleRemoveClick, handleLikeClick }, cardSelector) {
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleRemoveClick = handleRemoveClick;
    this._handleLikeClick = handleLikeClick;
    this._data = data;
    this.myId = { _id: '8763b23c68bf4bfc89163d6c' }
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.cards__item')
      .cloneNode(true);

    return cardElement;
  }

  //Установка слушателей
  _setCardEventListeners() {
    this._element.querySelector('.cards__image').addEventListener('click', () => {
      this._handleCardClick();
    });
    this._element.querySelector('.cards__delete-button').addEventListener('click', () => {
      this._handleRemoveClick();
    });
    this._element.querySelector('.cards__like-button').addEventListener('click', () => {
      this._handleLikeClick();
    });
  }

  _hasTrashButton() {
    if (this._data.owner._id === "8763b23c68bf4bfc89163d6c") {
      this._element.querySelector('.cards__delete-button').classList.add('cards__delete-button_active');
    }
  }

  //Проверка лайка при генерации карточки
  _hasLike() {
    let result = this._data.likes.find(i => {
      return i._id === '8763b23c68bf4bfc89163d6c'
    });
    if (result) {
      this._element.querySelector('.cards__like-button').classList.add('cards__like-button_active');
    }
    else {
      this._element.querySelector('.cards__like-button').classList.remove('cards__like-button_active');
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    const _cardImage = this._element.querySelector('.cards__image');
    _cardImage.src = this._link;
    _cardImage.alt = this._name;
    this._element.querySelector('.cards__name-caption').textContent = this._name;
    this._element.querySelector('.cards__like-counter').textContent = this._likes.length;
    this._hasTrashButton();
    this._hasLike();
    this._setCardEventListeners();

    return this._element;
  }

  likeCounter(item) {
    this._element.querySelector('.cards__like-counter').textContent = item.likes.length;
  }

  toggleLikeButton() {
    this._element.querySelector('.cards__like-button').classList.toggle('cards__like-button_active');
  }

  likeActive() {
    let result = this._likes.find(item => {
      return item._id === '8763b23c68bf4bfc89163d6c'
    });
    if (result) {
      this._likes.pop(this.myId);
      return true;
    }
    else {
      this._likes.push(this.myId);
      return false;
    }
  }

}
