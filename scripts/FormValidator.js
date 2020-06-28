export class FormValidator {
  constructor(popupSelectors, editForm) {
    this._formSelector = popupSelectors.formSelector;
    this._inputSelector = popupSelectors.inputSelector;
    this._submitButtonSelector = popupSelectors.submitButtonSelector;
    this._inactiveButtonClass = popupSelectors.inactiveButtonClass;
    this._inputErrorClass = popupSelectors.inputErrorClass;
    this._errorClass = popupSelectors.errorClass;
    this._editForm = editForm;
  }
  enableValidation() {
    this._inputElements = Array.from(this._editForm.querySelectorAll(this._inputSelector));
    this._submitButton = this._editForm.querySelector(this._submitButtonSelector);
    this._inputElements.forEach((input) => {
      input.addEventListener('input', (evt) => this._isValid(evt));
    });
    this._editForm.addEventListener('input', () => this._toggleButtonState()); //проверка активности кнопки при наборе символов
  }


  //Проверка формы на валидность
  _hasInvalidInput = () => {
    return this._inputElements.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Если форма не валидна, то кнопка становится неактивной и обратно 
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    }
    else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  }

  //Функция отображения ошибки о невалидности поля
  _showError() {
    this.input.classList.add(this._inputErrorClass);
    this.errorText.textContent = this.input.validationMessage;
    this.errorText.classList.add(this._errorClass);
  }

  //Функция скрытия ошибки о невалидности поля
  _hideError() {
    this.input.classList.remove(this._inputErrorClass);
    this.errorText.classList.remove(this._errorClass);
    this.errorText.textContent = '';
  };

  //Функция добавления и скрытия ошибок в зависимости от валидности полей 
  _isValid(evt) {
    this.input = evt.target;
    this.errorText = document.querySelector(`#${this.input.id}-error`);
    if (!this.input.validity.valid) {
      this._showError();

    }
    else {
      this._hideError();
    }
  }
  //Убрать ошибки и обнулить кнопку сохранения при закрытии попапа
  resetAfterClosePopup() {
      const inputs = Array.from(this._editForm.querySelectorAll(this._inputSelector));
      inputs.forEach((inputElement) => {
        inputElement.classList.remove(this._inputErrorClass);
        const errorElement = this._editForm.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = '';
      });
      this._button = this._editForm.querySelector(this._submitButtonSelector);
      this._button.classList.add(this._inactiveButtonClass);
      this._button.setAttribute('disabled', true);
    }
  }