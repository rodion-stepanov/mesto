//Проверка формы на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

//Если форма не валидна, то кнопка становится неактивной и обратно 
const toggleButtonState = (inputList, button, disabledButton) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(disabledButton);
    button.setAttribute('disabled', true);
  }
  else {
    button.classList.remove(disabledButton);
    button.removeAttribute('disabled');
  }
};

//Функция отображения ошибки о невалидности поля
function showError(input, error, errorText, inputErrorClass) {
  input.classList.add(inputErrorClass);
  errorText.textContent = input.validationMessage;
  errorText.classList.add(error);
};

//Функция скрытия ошибки о невалидности поля
function hideError(input, error, errorText, inputErrorClass) {
  input.classList.remove(inputErrorClass);
  errorText.classList.remove(error);
  errorText.textContent = '';
};

//Функция добавления и скрытия ошибок в зависимости от валидности полей 
function isValid(evt, error, inputErrorClass) {
  const input = evt.target;
  const errorText = document.querySelector(`#${input.id}-error`);
  if (!input.validity.valid) {
    showError(input, error, errorText, inputErrorClass);

  }
  else {
    hideError(input, error, errorText, inputErrorClass);
  }
}

function enableValidation(options) {
  const formElements = Array.from(document.querySelectorAll(options.formSelector));
  formElements.forEach((formElement) => {
    const inputElements = Array.from(formElement.querySelectorAll(options.inputSelector));
    const submitButton = formElement.querySelector(options.submitButtonSelector);
    inputElements.forEach((input) => {
      input.addEventListener('input', (evt) => isValid(evt, options.errorClass, options.inputErrorClass));
    });
    formElement.addEventListener('input', () => toggleButtonState(inputElements, submitButton, options.inactiveButtonClass)); //проверка активности кнопки при наборе символов
  });
}

