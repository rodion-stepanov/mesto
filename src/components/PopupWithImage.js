import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector, image, caption) {
        super(popupSelector);
        this.image = document.querySelector(image);
        this.caption = document.querySelector(caption);
    }
    open(data) {
        // super.setEventListeners();
        this.image.src = data.link;
        this.image.alt = data.name;
        this.caption.textContent = data.name;
        super.open();
    }
}