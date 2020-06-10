function enableValidation(options) {
  const formElements = Array.from(document.querySelectorAll(options.formSelector));
  formElements.forEach(formElement => {
    const inputElements = Array.from(formElement.querySelectorAll(options.inputSelector));
    const submitButton = formElement.querySelector(options.submitButtonSelector);
    // toggleButtonState(inputElements, submitButton, options.inactiveButtonClass); //проверка активности кнопки при открытии попапа
    inputElements.forEach(input => {
      input.addEventListener('input', (evt) => isValid(evt, options.errorClass, options.inputErrorClass));
    });
    formElement.addEventListener('input', () => toggleButtonState(inputElements, submitButton, options.inactiveButtonClass)); //проверка активности кнопки при наборе символов
  });
}

