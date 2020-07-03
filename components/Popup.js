export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }
    open() {
        this._popupSelector.classList.add("popup_opened");
        document.addEventListener('keydown', this._handleEscClose);
        document.addEventListener('click', this._onclickClosePopup);
    }
    close() {
        this._popupSelector.classList.remove("popup_opened");
        document.removeEventListener('keydown', this._handleEscClose);
        document.removeEventListener('click', this._onclickClosePopup);
    }
    //TODO проверить this._popupSelector в  _handleEscClose и _onclickClosePopup
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            const openedPopup = document.querySelector('.popup_opened');
            this.close(openedPopup);
        }
    }
    _onclickClosePopup(evt) {
        const openedPopup = document.querySelector('.popup_opened');
        if (evt.target.classList.contains('popup')) {
            this._close(openedPopup);
        }
    }
    setEventListeners() {

    }
}

// //Функция закрытия попапа
// function closePopup(elem) {
//     elem.classList.remove("popup_opened");
//     document.removeEventListener('keydown', keyPress);
//     document.removeEventListener('click', onclickClosePopup);
// }

// //закрытие все попапов по клавише escape
// function keyPress(e) {
//     if (e.key === "Escape") {
//         const openedPopup = document.querySelector('.popup_opened');
//         closePopup(openedPopup);
//     }
// }

// //Закрытие всех попапов по клику на оверлей
// function onclickClosePopup(evt) {
//     const openedPopup = document.querySelector('.popup_opened');
//     if (evt.target.classList.contains('popup')) {
//         closePopup(openedPopup);
//     }
// }

// // Функция открытия попапа
// function openPopup(elem) {
//     elem.classList.add("popup_opened");
//     document.addEventListener('keydown', keyPress);
//     document.addEventListener('click', onclickClosePopup);
// }