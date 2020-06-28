//Функция закрытия попапа
function closePopup(elem) {
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
    if (evt.target.classList.contains('popup')) {
      closePopup(openedPopup);
    }
  }
  
  // Функция открытия попапа
  function openPopup(elem) {
    elem.classList.add("popup_opened");
    document.addEventListener('keydown', keyPress);
    document.addEventListener('click', onclickClosePopup);
  }

export {closePopup, keyPress, onclickClosePopup, openPopup};