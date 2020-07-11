import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popupSelector.querySelector('.popup__container');
        this._submit = this._submit.bind(this);
    }
    _getInputValues() {
        this._inputList = this._popupForm.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    _submit(evt) {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', this._submit);
    }

    close() {
        super.close();
        this._popupSelector.querySelector('.popup__container').reset();
    }
}