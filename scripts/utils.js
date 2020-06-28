//Убрать ошибки и обнулить кнопку сохранения при закрытии попапа
function resetAfterClosePopup(openedPopup) {
    if (!openedPopup.classList.contains('popup_image_open')) {
      const inputs = Array.from(openedPopup.querySelectorAll('.popup__input'));
      inputs.forEach((inputElement) => {
        inputElement.classList.remove('popup__input_type_error');
        const errorElement = openedPopup.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = '';
      });
      const button = openedPopup.querySelector('.popup__save-button');
      button.classList.add('popup__save-button_disabled');
      button.setAttribute('disabled', true);
    }
  }

//Функция закрытия попапа
function closePopup(elem) {
    resetAfterClosePopup(elem);
    elem.classList.remove("popup_opened");
    document.removeEventListener('keydown', keyPress);
    document.removeEventListener('click', onclickClosePopup);
  }
  
  //закрытие все попапов по клавише escape
  function keyPress(e) {
    if (e.key === "Escape") {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
    }
  }
  
  //Закрытие всех попапов по клику на оверлей
  function onclickClosePopup(evt) {
    const openedPopup = document.querySelector('.popup_opened');
    const popup = openedPopup.closest('.popup');
    if (evt.target === popup) {
      closePopup(openedPopup);
    }
  }
  
  // Функция открытия попапа
  function openPopup(elem) {
    elem.classList.add("popup_opened");
    document.addEventListener('keydown', keyPress);
    document.addEventListener('click', onclickClosePopup);
  }

export {resetAfterClosePopup, closePopup, keyPress, onclickClosePopup, openPopup};