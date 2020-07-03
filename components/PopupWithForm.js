import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(submit, popupSelector) {
        super(popupSelector);
        this._submit = submit;
    }
    _getInputValues() {

    }
    setEventListeners() {
        super.setEventListeners();
    }
    close() {
        super.close();
    }
}