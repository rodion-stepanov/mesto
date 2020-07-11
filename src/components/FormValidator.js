export class FormValidator {
  constructor(popupSelectors, editForm) {
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
  _hasInvalidInput() {
    return this._inputElements.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Если форма не валидна, то кнопка становится неактивной и обратно 
  _toggleButtonState() {
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
  _showError(input, errorText) {
    input.classList.add(this._inputErrorClass);
    errorText.textContent = input.validationMessage;
    errorText.classList.add(this._errorClass);
  }

  //Функция скрытия ошибки о невалидности поля
  _hideError(input, errorText) {
    input.classList.remove(this._inputErrorClass);
    errorText.classList.remove(this._errorClass);
    errorText.textContent = '';
  };

  //Функция добавления и скрытия ошибок в зависимости от валидности полей 
  _isValid(evt) {
    const input = evt.target;
    const errorText = document.querySelector(`#${input.id}-error`);
    if (!input.validity.valid) {
      this._showError(input, errorText);

    }
    else {
      this._hideError(input, errorText);
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
    const button = this._editForm.querySelector(this._submitButtonSelector);
    button.classList.add(this._inactiveButtonClass);
    button.setAttribute('disabled', true);
  }
}