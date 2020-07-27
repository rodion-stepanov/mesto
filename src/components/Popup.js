export class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
        this._popupForm = this._popupSelector.querySelector('.popup__container');
        this._handleEscClose = this._handleEscClose.bind(this);
        this._onclickClosePopup = this._onclickClosePopup.bind(this);
    }

    open() {
        this._popupSelector.classList.add("popup_opened");
    }

    close() {
        this._popupSelector.classList.remove("popup_opened");
        // document.removeEventListener('keydown', this._handleEscClose);
        // document.removeEventListener('click', this._onclickClosePopup);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }
    _onclickClosePopup(evt) {
        if (evt.target.classList.contains('popup')) {
            this.close();
        }
    }
    setEventListeners() {
        this._popupSelector.querySelector(".popup__close-button").addEventListener('click', () => this.close());
        document.addEventListener('keydown', this._handleEscClose);
        document.addEventListener('click', this._onclickClosePopup);
    }
}