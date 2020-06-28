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
    const inputElements = Array.from(this._editForm.querySelectorAll(this._inputSelector));
    const submitButton = this._editForm.querySelector(this._submitButtonSelector);
    inputElements.forEach((input) => {
      input.addEventListener('input', (evt) => this._isValid(evt, this._errorClass, this._inputErrorClass));
    });
    this._editForm.addEventListener('input', () => this._toggleButtonState(inputElements, submitButton, this._inactiveButtonClass)); //проверка активности кнопки при наборе символов
  }


  //Проверка формы на валидность
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Если форма не валидна, то кнопка становится неактивной и обратно 
  _toggleButtonState = (inputList, button, disabledButton) => {
    if (this._hasInvalidInput(inputList)) {
      button.classList.add(disabledButton);
      button.setAttribute('disabled', true);
    }
    else {
      button.classList.remove(disabledButton);
      button.removeAttribute('disabled');
    }
  }

  //Функция отображения ошибки о невалидности поля
  _showError(input, error, errorText, inputErrorClass) {
    input.classList.add(inputErrorClass);
    errorText.textContent = input.validationMessage;
    errorText.classList.add(error);
  }

  //Функция скрытия ошибки о невалидности поля
  _hideError(input, error, errorText, inputErrorClass) {
    input.classList.remove(inputErrorClass);
    errorText.classList.remove(error);
    errorText.textContent = '';
  };

  //Функция добавления и скрытия ошибок в зависимости от валидности полей 
  _isValid(evt, error, inputErrorClass) {
    const input = evt.target;
    const errorText = document.querySelector(`#${input.id}-error`);
    if (!input.validity.valid) {
      this._showError(input, error, errorText, inputErrorClass);

    }
    else {
      this._hideError(input, error, errorText, inputErrorClass);
    }
  }
}