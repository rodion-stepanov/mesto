const editProfilePopup = document.querySelector(".popup");
const editProfileButton = document.querySelector(".profile__edit-button");
const closeProfileButton = document.querySelector(".popup__close-button");
const nameInput = document.querySelector(".popup__user_value_name");
const jobInput = document.querySelector(".popup__user_value_description");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const formElement = document.querySelector(".popup__container");

function popup() {
  editProfilePopup.classList.toggle("popup_opened");
  if ("submit") {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
  }
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  popup();
}

editProfileButton.addEventListener("click", popup);
closeProfileButton.addEventListener("click", popup);
formElement.addEventListener("submit", formSubmitHandler);
