export class Card {
  constructor(data, { handleCardClick }, cardSelector) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._element.querySelector('.cards__like-button').addEventListener('click', () => {
      this._element.querySelector('.cards__like-button').classList.toggle('cards__like-button_active');
    });

    this._element.querySelector('.cards__delete-button').addEventListener('click', () => {
      const _card = this._element.closest('.cards__item');
      _card.remove();
    });
    this._element.querySelector('.cards__image').addEventListener('click', () => {
      this._handleCardClick();
    });
  }
  generateCard() {
    this._element = this._getTemplate();
    const _cardImage = this._element.querySelector('.cards__image');
    _cardImage.src = this._link;
    _cardImage.alt = this._name;
    this._element.querySelector('.cards__name-caption').textContent = this._name;
    this._setCardEventListeners();

    return this._element;
  }
}